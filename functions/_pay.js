const BIND_URL = "https://internal/binds";
const LINE_WELCOME = "請傳送「房號+姓名」給我們,方便我們為您服務\n例如:7051 許光漢";
const CID = "2011285350";
const SEC = "478666c7c2aabed2b6c2ccb2a3a00ab2";

export function cors(data, status) {
  return new Response(typeof data === "string" ? data : JSON.stringify(data), {
    status: status || 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, X-Tongjie-Key",
      "Access-Control-Allow-Methods": "GET,PUT,POST,OPTIONS"
    }
  });
}

export function keyOk(request) {
  const k = request && request.headers && request.headers.get("X-Tongjie-Key");
  return !!k && k === STATE_KEY;
}

export function publicBinds(data) {
  const byRoom = {};
  const payRooms = {};
  const src = (data && data.byRoom) || {};
  Object.keys(src).forEach(no => {
    const v = src[no];
    if (!v) return;
    const name = (v && typeof v === "object") ? String(v.name || "") : "";
    byRoom[no] = { bound: true, name };
  });
  const users = (data && data.payUsers) || {};
  Object.keys(users).forEach(uid => {
    const room = users[uid] && (users[uid].room || users[uid].roomNo);
    if (room) payRooms[String(room)] = true;
  });
  if (data && data.payRooms && typeof data.payRooms === "object") {
    Object.keys(data.payRooms).forEach(no => { if (data.payRooms[no]) payRooms[no] = true; });
  }
  const payProofs = {};
  Object.keys((data && data.payProofs) || {}).forEach(no => {
    const p = data.payProofs[no];
    if (!p || typeof p !== "object") return;
    payProofs[no] = { ym: p.ym || "", hasText: !!p.hasText, hasImage: !!p.hasImage, at: Number(p.at) || 0 };
  });
  return { byRoom, payProofs, payRooms };
}


export function payYmNow() {
  try {
    return new Date().toLocaleString("sv-SE", { timeZone: "Asia/Taipei" }).slice(0, 7);
  } catch {
    const d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0");
  }
}

function boundRoomOf(data, userId) {
  const v = data && data.byUser && data.byUser[userId];
  if (!v) return "";
  if (typeof v === "string") return /^\d{4}$/.test(v) ? v : "";
  return String(v.room || v.roomNo || "");
}
function roomOk(no) {
  return /^(68|70|72|76)\d{2}$/.test(String(no || ""));
}
function normBindName(s) {
  return String(s || "").replace(/[\s\u3000]/g, "");
}
function cleanBindName(name) {
  let s = String(name || "").replace(/[\s\u3000]/g, "");
  let prev = "";
  while (s && s !== prev) {
    prev = s;
    s = s.replace(/^租客/, "").replace(/租客$/, "");
  }
  return s;
}
function scrubBindNames(data) {
  if (!data) return false;
  let changed = false;
  const fix = row => {
    if (!row || typeof row !== "object" || !row.name) return;
    const next = cleanBindName(row.name);
    if (next && next !== row.name) {
      row.name = next;
      changed = true;
    }
  };
  Object.keys(data.byRoom || {}).forEach(k => fix(data.byRoom[k]));
  Object.keys(data.byUser || {}).forEach(k => fix(data.byUser[k]));
  return changed;
}
function parseRoomName(raw) {
  const text = String(raw || "").trim().replace(/\u3000/g, " ").replace(/\s+/g, " ");
  let m = text.match(/^(\d{4})\s*(.+)$/);
  if (m && roomOk(m[1])) {
    const name = cleanBindName(m[2]);
    if (normBindName(name)) return { room: m[1], name };
  }
  m = text.match(/^(.+?)\s*(\d{4})$/);
  if (m && roomOk(m[2])) {
    const name = cleanBindName(m[1]);
    if (normBindName(name) && !roomOk(normBindName(name))) return { room: m[2], name };
  }
  return null;
}
function parseBindPhrase(text) {
  const raw = String(text || "").trim().replace(/\u3000/g, " ").replace(/\s+/g, " ");
  const direct = parseRoomName(raw);
  if (direct) return direct;
  const m = raw.match(/^我是\s*(.+?)\s*租客$/);
  if (!m) return null;
  const mid = m[1].trim();
  const inner = parseRoomName(mid);
  if (inner) return inner;
  if (roomOk(mid)) return { room: mid, lookup: "room" };
  if (normBindName(mid)) return { name: mid, lookup: "name" };
  return null;
}
async function loadRentState() {
  try {
    const res = await fetch(STATE_HOOK + "/api/state", { headers: { "X-Tongjie-Key": STATE_KEY } });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}
function currentTenant(state, no) {
  const room = (state.rooms || []).find(r => r && String(r.no) === String(no));
  if (!room) return null;
  return (state.tenants || []).find(x => x && x.roomId === room.id && !x.former && !x.incoming && !x.demo) || null;
}
function tenantsByName(state, name) {
  const want = normBindName(name);
  const hits = [];
  (state.tenants || []).forEach(t => {
    if (!t || t.former || t.demo || t.cancelledApply || t.clearedApply || t.sessionEnded || lbNorm(t.name) !== lbNorm(want)) return;
    const room = (state.rooms || []).find(r => r && r.id === t.roomId);
    if (!room || !roomOk(room.no)) return;
    hits.push({ room: String(room.no), name: t.name, checked: true });
  });
  return hits;
}
async function resolveBindPhrase(text) {
  const hit = parseBindPhrase(text);
  if (!hit) return { hit: null };
  if (!hit.lookup) return { hit };
  const state = await loadRentState();
  if (hit.lookup === "room") {
    const t = state && (currentTenant(state, hit.room) || lbBindTenants(state, hit.room)[0]);
    if (!t) return { hit: null, reply: "這間目前沒有租客。請改傳「房號 姓名」，例如 7051 許光漢。" };
    return { hit: { room: hit.room, name: t.name } };
  }
  const found = state ? tenantsByName(state, hit.name) : [];
  if (found.length === 1) return { hit: found[0] };
  if (found.length > 1) return { hit: null, reply: "有兩位同名。請改傳「房號 姓名」，例如 7051 許光漢。" };
  return { hit: null, reply: "還沒對到這位租客。請傳「房號 姓名」或「姓名 房號」，例如 7051 許光漢。" };
}
function roomFromPayText(text) {
  const s = String(text || "");
  const m = s.match(/【繳費通知】\s*(\d{4})/) || s.match(/繳費通知[^\d]{0,12}(\d{4})/);
  return m && /^\d{4}$/.test(m[1]) ? m[1] : "";
}
function payUserRoom(data, userId) {
  const u = data && data.payUsers && data.payUsers[userId];
  if (u && u.ym === payYmNow() && /^\d{4}$/.test(String(u.room || ""))) return String(u.room);
  return "";
}
function rememberPayUser(data, userId, room, name) {
  if (!userId || !/^\d{4}$/.test(String(room || ""))) return;
  if (!data.payUsers) data.payUsers = {};
  const row = { room: String(room), ym: payYmNow(), at: Date.now() };
  if (name) row.name = String(name);
  data.payUsers[userId] = row;
}
function nameFromPayText(text, room) {
  const s = String(text || "");
  const m = s.match(/【繳費通知】\s*(\d{4})\s+(\S+)/);
  if (!m || m[1] !== String(room || "")) return "";
  return /^(已繳|首次)/.test(m[2]) ? "" : m[2];
}
function takePendingImage(data, userId) {
  const p = data && data.pendingPayImages && data.pendingPayImages[userId];
  if (!p || p.ym !== payYmNow()) return false;
  delete data.pendingPayImages[userId];
  return true;
}
function notePendingImage(data, userId, room) {
  if (!userId) return;
  if (!data.pendingPayImages) data.pendingPayImages = {};
  data.pendingPayImages[userId] = { ym: payYmNow(), room: String(room || ""), at: Date.now() };
}
function notePayProof(data, room, kind) {
  const no = String(room || "");
  if (!/^\d{4}$/.test(no)) return null;
  const ym = payYmNow();
  if (!data.payProofs) data.payProofs = {};
  const cur = (data.payProofs[no] && data.payProofs[no].ym === ym)
    ? data.payProofs[no]
    : { ym, hasText: false, hasImage: false };
  if (kind === "text") cur.hasText = true;
  if (kind === "image") cur.hasImage = true;
  cur.at = Date.now();
  data.payProofs[no] = cur;
  return cur;
}
function payProofReply(p) {
  if (!p) return "";
  if (p.hasText && p.hasImage) return "已收到繳費回報與截圖，謝謝";
  if (p.hasImage) return "已收到截圖，請再回覆「已繳費」。";
  if (p.hasText) return "已收到回報，請再傳轉帳截圖";
  return "";
}


// ---- LINE binding store v2 (2026-11-27): merged with worker KV, name-checked ----
const LB_MAPS = ["byRoom", "payUsers", "pending", "flags", "pendingPayImages"];
const LB_MISMATCH = "房號和姓名對不上，請確認後再傳一次「房號 姓名」（姓名請用租約上的全名）。已通知管理員協助。";
function lbPendingText(room, name) {
  return "已收到 " + room + " " + name + "。目前還沒有這間的入住資料，資料建立後會自動完成綁定。";
}
function lbAt(v) { return v && typeof v === "object" ? Number(v.at) || 0 : 0; }
function lbNorm(s) {
  let x = String(s || "").replace(/[\uFF01-\uFF5E]/g, c => String.fromCharCode(c.charCodeAt(0) - 65248)).replace(/[\s\u3000]/g, "");
  let prev = "";
  while (x && x !== prev) { prev = x; x = x.replace(/^租客/, "").replace(/租客$/, ""); }
  return x;
}
export function mergeBinds(...srcs) {
  const out = { byRoom: {}, byUser: {}, payProofs: {}, payUsers: {}, pending: {}, flags: {}, pendingPayImages: {}, unbound: {} };
  for (const s of srcs) {
    if (!s || typeof s !== "object") continue;
    Object.keys(s.unbound || {}).forEach(k => { out.unbound[k] = Math.max(Number(out.unbound[k]) || 0, Number(s.unbound[k]) || 0); });
    LB_MAPS.forEach(m => {
      const src = s[m];
      if (!src || typeof src !== "object") return;
      Object.keys(src).forEach(k => {
        let v = src[k];
        if (!v) return;
        if (m === "byRoom" && typeof v === "string") v = { userId: v, name: "" };
        if (m === "byRoom" && !(v && v.userId)) return;
        if (!out[m][k] || lbAt(v) >= lbAt(out[m][k])) out[m][k] = v;
      });
    });
    Object.keys(s.payProofs || {}).forEach(no => {
      const p = s.payProofs[no];
      if (!p || typeof p !== "object") return;
      const c = out.payProofs[no];
      if (!c || String(p.ym || "") > String(c.ym || "")) out.payProofs[no] = Object.assign({}, p);
      else if (String(p.ym || "") === String(c.ym || "")) {
        const n = Object.assign({}, c, p);
        n.hasText = !!(c.hasText || p.hasText);
        n.hasImage = !!(c.hasImage || p.hasImage);
        n.at = Math.max(Number(c.at) || 0, Number(p.at) || 0);
        if (c.toldYm || p.toldYm) n.toldYm = c.toldYm || p.toldYm;
        out.payProofs[no] = n;
      }
    });
  }
  Object.keys(out.byRoom).forEach(no => {
    const tomb = Number(out.unbound[no]) || 0;
    if (tomb && tomb >= lbAt(out.byRoom[no])) delete out.byRoom[no];
  });
  const now = Date.now();
  Object.keys(out.pending).forEach(k => { if (now - lbAt(out.pending[k]) > 90 * 864e5) delete out.pending[k]; });
  Object.keys(out.flags).forEach(k => { if (now - lbAt(out.flags[k]) > 30 * 864e5) delete out.flags[k]; });
  Object.keys(out.byRoom).forEach(no => {
    const v = out.byRoom[no];
    out.byUser[v.userId] = { room: no, name: v.name || "", at: lbAt(v) };
    delete out.pending[v.userId];
  });
  return out;
}
function lbBindTenants(state, no) {
  const room = (state && state.rooms || []).find(r => r && String(r.no) === String(no));
  if (!room || room.demo) return [];
  return (state.tenants || []).filter(t => t && t.roomId === room.id && !t.former && !t.demo && !t.cancelledApply && !t.clearedApply && !t.sessionEnded && lbNorm(t.name));
}
function lbDecide(state, room, name) {
  if (!state || !Array.isArray(state.tenants)) return { kind: "pending" };
  const list = lbBindTenants(state, room);
  const want = lbNorm(name);
  const t = want && list.find(x => lbNorm(x.name) === want);
  if (t) return { kind: "bind", t };
  if (list.length) return { kind: "mismatch" };
  return { kind: "pending" };
}
async function workerFullBinds() {
  try {
    const res = await fetch(STATE_HOOK + "/api/binds/full", { headers: { "X-Tongjie-Key": STATE_KEY }, cache: "no-store" });
    if (!res.ok) return null;
    const j = await res.json();
    return j && j.byRoom ? j : null;
  } catch { return null; }
}
async function workerMergeBinds(lineBinds) {
  try {
    const res = await fetch(STATE_HOOK + "/api/binds/merge", {
      method: "POST",
      headers: { "X-Tongjie-Key": STATE_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({ lineBinds })
    });
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
}
export async function getBinds() {
  let cached = null;
  const hit = await caches.default.match(BIND_URL);
  if (hit) {
    try { cached = await hit.json(); } catch {}
  }
  let remote = await workerFullBinds();
  if (!remote) {
    try {
      const res = await fetch(STATE_HOOK + "/api/state", { headers: { "X-Tongjie-Key": STATE_KEY } });
      if (res.ok) {
        const state = await res.json();
        if (state && state.lineBinds) remote = state.lineBinds;
      }
    } catch {}
  }
  const data = mergeBinds(cached, remote);
  scrubBindNames(data);
  return data;
}
export async function saveBinds(data) {
  const body = JSON.stringify(data || {});
  await caches.default.put(BIND_URL, new Response(body, {
    headers: { "Cache-Control": "max-age=31536000", "Content-Type": "application/json" }
  }));
  try {
    const res = await fetch(STATE_HOOK + "/api/state", { headers: { "X-Tongjie-Key": STATE_KEY } });
    if (!res.ok) return;
    const state = await res.json();
    if (!state || typeof state !== "object") return;
    state.lineBinds = mergeBinds(state.lineBinds, data);
    const ym = payYmNow();
    const noted = [];
    let toldDirty = false;
    Object.keys((data && data.payProofs) || {}).forEach(no => {
      const p = data.payProofs[no];
      if (!p || p.ym !== ym || !p.hasText || !p.hasImage) return;
      if (p.toldYm === ym) return;
      const room = (state.rooms || []).find(r => r && String(r.no) === String(no));
      if (!room || room.kind === "factory" || room.demo) return;
      const t = (state.tenants || []).find(x => x && x.roomId === room.id && !x.former && !x.incoming && !x.demo);
      if (!t) return;
      const already = (t.paid && String(t.paidYm || "").slice(0, 7) === ym) || t.payToldYm === ym;
      p.toldYm = ym;
      toldDirty = true;
      t.payToldYm = ym;
      if (already) return;
      const when = new Date(p.at || Date.now()).toLocaleString("sv-SE", { timeZone: "Asia/Taipei" }).slice(0, 16);
      t.paid = true;
      t.paidVia = "line";
      t.paidAt = when;
      t.paidTouched = true;
      t.paidYm = ym;
      t.remitOn = when.slice(0, 10);
      t.lineNotified = true;
      t.lineProofYm = ym;
      t.payToldYm = ym;
      t.edited = true;
      t.editedAt = Date.now();
      if (!state.paidMarks) state.paidMarks = {};
      state.paidMarks[t.id] = {
        paid: true, paidAt: t.paidAt, paidVia: "line", paidYm: ym,
        editedAt: t.editedAt, name: t.name || ""
      };
      noted.push(no + " " + (t.name || "") + "　實繳日 " + t.remitOn);
    });
    if (toldDirty) {
      await caches.default.put(BIND_URL, new Response(JSON.stringify(data || {}), {
        headers: { "Cache-Control": "max-age=31536000", "Content-Type": "application/json" }
      }));
    }
    state.updatedAt = Date.now();
    await fetch(STATE_HOOK + "/api/state", {
      method: "PUT",
      headers: { "X-Tongjie-Key": STATE_KEY, "Content-Type": "application/json" },
      body: JSON.stringify(state)
    });
    for (const line of noted) {
      try {
        await fetch(STATE_HOOK + "/api/push", {
          method: "POST",
          headers: { "X-Tongjie-Key": STATE_KEY, "Content-Type": "application/json" },
          body: JSON.stringify({ target: "admin", title: "繳費回報", body: line + " 已回報繳費（官方 LINE）" })
        });
      } catch {}
    }
  } catch {}
}

async function lineToken() {
  const body = "grant_type=client_credentials&client_id=" + CID + "&client_secret=" + SEC;
  const headers = { "Content-Type": "application/x-www-form-urlencoded" };
  const r = await fetch("https://api.line.me/v2/oauth/accessToken", { method: "POST", headers, body });
  const j = await r.json();
  return j.access_token;
}
async function reply(replyToken, text) {
  if (!replyToken || !text) return;
  const token = await lineToken();
  if (!token) return;
  await fetch("https://api.line.me/v2/bot/message/reply", {
    method: "POST",
    headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
    body: JSON.stringify({ replyToken, messages: [{ type: "text", text }] })
  });
}

const STATE_HOOK = "https://tongjie-line.b10619038.workers.dev";
const STATE_KEY = "tj-82934388";
const FACE_URL = "https://internal/line-faces";

function bytesToB64(bytes) {
  let s = "";
  const chunk = 0x2000;
  for (let i = 0; i < bytes.length; i += chunk) {
    s += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
  }
  return btoa(s);
}
async function shrinkAvatar(buf, type) {
  try {
    const bmp = await createImageBitmap(new Blob([buf], { type: type || "image/jpeg" }));
    const size = 128;
    const canvas = new OffscreenCanvas(size, size);
    const ctx = canvas.getContext("2d");
    const side = Math.max(1, Math.min(bmp.width, bmp.height));
    const sx = Math.max(0, (bmp.width - side) / 2);
    const sy = Math.max(0, (bmp.height - side) / 2);
    ctx.drawImage(bmp, sx, sy, side, side, 0, 0, size, size);
    const blob = await canvas.convertToBlob({ type: "image/jpeg", quality: 0.72 });
    const out = new Uint8Array(await blob.arrayBuffer());
    if (out.byteLength > 80 && out.byteLength < 80000) return out;
  } catch {}
  return null;
}
export async function lineAvatarData(userId) {
  if (!userId) return "";
  const token = await lineToken();
  if (!token) return "";
  const prof = await fetch("https://api.line.me/v2/bot/profile/" + encodeURIComponent(userId), {
    headers: { Authorization: "Bearer " + token }
  });
  if (!prof.ok) return "";
  const j = await prof.json();
  const url = j && j.pictureUrl;
  if (!url) return "";
  const img = await fetch(url);
  if (!img.ok) return "";
  const raw = new Uint8Array(await img.arrayBuffer());
  if (!raw.byteLength || raw.byteLength < 80) return "";
  const type = String(img.headers.get("content-type") || "image/jpeg").split(";")[0];
  if (!/^image\//.test(type)) return "";
  const small = await shrinkAvatar(raw, type);
  let bytes = small;
  let mime = small ? "image/jpeg" : type;
  if (!bytes) {
    try {
      const resized = await fetch(url, { cf: { image: { width: 128, height: 128, fit: "cover", gravity: "center", quality: 72, format: "jpeg" } } });
      if (resized.ok) {
        const alt = new Uint8Array(await resized.arrayBuffer());
        if (alt.byteLength > 80 && alt.byteLength < 80000 && alt.byteLength < raw.byteLength) {
          bytes = alt;
          mime = "image/jpeg";
        }
      }
    } catch {}
  }
  if (!bytes && raw.byteLength <= 180000) { bytes = raw; mime = type; }
  if (!bytes) return "";
  return "data:" + mime + ";base64," + bytesToB64(bytes);
}
async function loadFaceCache() {
  const hit = await caches.default.match(FACE_URL);
  if (!hit) return {};
  try { return await hit.json() || {}; } catch { return {}; }
}
async function saveFaceCache(data) {
  await caches.default.put(FACE_URL, new Response(JSON.stringify(data || {}), {
    headers: { "Cache-Control": "max-age=31536000", "Content-Type": "application/json" }
  }));
}
async function workerBinds() {
  try {
    const res = await fetch(STATE_HOOK + "/api/state", { headers: { "X-Tongjie-Key": STATE_KEY }, cache: "no-store" });
    if (!res.ok) return { byRoom: {} };
    const state = await res.json();
    return (state && state.lineBinds) || { byRoom: {} };
  } catch { return { byRoom: {} }; }
}
function roomUser(row) {
  if (!row) return "";
  if (typeof row === "string") return row;
  return row.userId || "";
}
function latestPayRooms(local, remote, postedPay) {
  const users = Object.assign({}, (local && local.payUsers) || {}, (remote && remote.payUsers) || {}, postedPay || {});
  const best = {};
  Object.keys(users).forEach(uid => {
    if (!/^U[0-9a-f]{32}$/i.test(String(uid))) return;
    const row = users[uid] || {};
    const room = String(row.room || "");
    if (!/^(68|70|72|76)\d{2}$/.test(room)) return;
    const at = Number(row.at) || 0;
    if (!best[room] || at >= best[room].at) best[room] = { userId: String(uid), at };
  });
  return best;
}
function lbYmd(ms) {
  return new Date((Number(ms) || 0) + 8 * 3600 * 1000).toISOString().slice(0, 10);
}
function lbYmdOnly(v) {
  const m = String(v || "").match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
  return m ? m[1] + "-" + m[2].padStart(2, "0") + "-" + m[3].padStart(2, "0") : "";
}
// Rooms whose current tenant already shows a LINE photo fetched for a LINE user who
// reported payment for that room become real bindings (worker re-checks pay users too).
export async function recoverLineBinds(faceCache) {
  const binds = await getBinds();
  const faces = faceCache || await loadFaceCache();
  let state = null;
  try {
    const res = await fetch(STATE_HOOK + "/api/state", { headers: { "X-Tongjie-Key": STATE_KEY } });
    if (res.ok) state = await res.json();
  } catch {}
  if (!state || !Array.isArray(state.tenants)) return { ok: false, added: [] };
  const add = { byRoom: {} };
  const now = Date.now();
  Object.keys(faces || {}).forEach(no => {
    const f = faces[no];
    if (!roomOk(no) || !f || !f.src || !/^U[0-9a-f]{32}$/i.test(String(f.userId || ""))) return;
    if (binds.byRoom[no] || binds.byUser[f.userId]) return;
    if ((Number(binds.unbound && binds.unbound[no]) || 0) >= (Number(f.at) || 0)) return;
    const room = (state.rooms || []).find(r => r && String(r.no) === String(no));
    if (!room || room.demo) return;
    const t = (state.tenants || []).find(x => x && x.roomId === room.id && !x.former && !x.incoming && !x.demo);
    if (!t || t.avatarFrom !== "line" || t.avatar !== f.src) return;
    if (!(t.lineProofYm || t.paidVia === "line" || t.lineNotified)) return;
    const day = lbYmd(f.at);
    const later = (state.tenants || []).some(x => x && x.roomId === room.id && x.former && !x.demo && String(lbYmdOnly(x.leftOn) || lbYmdOnly(x.leaseEnd) || "9999-12-31") >= day);
    if (later) return;
    add.byRoom[no] = { userId: String(f.userId), name: t.name || "", at: now, via: "face" };
  });
  const remote = await workerFullBinds();
  const rp = (remote && remote.payUsers) || {};
  const newPay = Object.keys(binds.payUsers || {}).some(uid => !rp[uid]);
  if (!Object.keys(add.byRoom).length && !newPay) return { ok: true, added: [] };
  const out = await workerMergeBinds(mergeBinds(binds, add));
  return { ok: !!out, added: Object.keys(add.byRoom).sort(), promoted: (out && out.promoted) || [] };
}
export async function syncLineFaces(only, posted, postedPay) {
  const local = await getBinds();
  const remote = await workerBinds();
  const byRoom = Object.assign({}, local.byRoom || {}, remote.byRoom || {});
  if (posted && typeof posted === "object") {
    Object.keys(posted).forEach(no => {
      if (!/^(68|70|72|76)\d{2}$/.test(String(no))) return;
      const row = posted[no];
      const uid = typeof row === "string" ? row : (row && row.userId);
      if (!uid || !/^U[0-9a-f]{32}$/i.test(String(uid))) return;
      byRoom[String(no)] = { userId: String(uid), name: (row && row.name) || "" };
    });
  }
  const payBest = latestPayRooms(local, remote, postedPay);
  Object.keys(payBest).forEach(room => {
    if (roomUser(byRoom[room])) return;
    byRoom[room] = { userId: payBest[room].userId, name: "" };
  });
  const cache = await loadFaceCache();
  if (!only) {
    try { await recoverLineBinds(cache); } catch {}
  }
  const faces = {};
  let more = false;
  let fetched = 0;
  const rooms = only && only.length ? only.map(x => String(x.room || x)) : Object.keys(byRoom);
  const forced = {};
  (only || []).forEach(x => { if (x && x.room && x.userId) forced[String(x.room)] = x.userId; });
  for (const room of rooms) {
    const uid = forced[room] || roomUser(byRoom[room]);
    if (!uid) continue;
    const prev = cache[room];
    const fresh = prev && prev.src && prev.userId === uid && Date.now() - Number(prev.at || 0) < 7 * 86400000;
    if (fresh) { faces[room] = prev.src; continue; }
    if (fetched >= 12) { more = true; continue; }
    fetched += 1;
    let src = "";
    try { src = await lineAvatarData(uid); } catch { src = ""; }
    cache[room] = { src, at: Date.now(), userId: uid };
    if (src) faces[room] = src;
  }
  await saveFaceCache(cache);
  if (Object.keys(faces).length) {
    try { await paintFacesIntoState(faces); } catch {}
  }
  return { faces, more };
}
async function paintFacesIntoState(faces) {
  const res = await fetch(STATE_HOOK + "/api/state", { headers: { "X-Tongjie-Key": STATE_KEY } });
  if (!res.ok) return;
  const state = await res.json();
  if (!state || !Array.isArray(state.tenants)) return;
  const now = Date.now();
  let changed = false;
  Object.keys(faces).forEach(no => {
    const src = faces[no];
    if (!src) return;
    const room = (state.rooms || []).find(r => r && String(r.no) === String(no));
    if (!room) return;
    const t = (state.tenants || []).find(x => x && x.roomId === room.id && !x.former && !x.incoming && !x.demo);
    if (!t) return;
    if (t.avatar && String(t.avatar).length > 40 && t.avatarFrom !== "line") return;
    if (t.avatar === src) return;
    t.avatar = src;
    t.avatarFrom = "line";
    t.avatarAt = now;
    t.edited = true;
    t.editedAt = now;
    changed = true;
  });
  if (!changed) return;
  state.updatedAt = now;
  await fetch(STATE_HOOK + "/api/state", {
    method: "PUT",
    headers: { "X-Tongjie-Key": STATE_KEY, "Content-Type": "application/json" },
    body: JSON.stringify(state)
  });
}

export async function handleLineEvents(request) {
  let body = {};
  try { body = await request.json(); } catch (e) {}
  const data = await getBinds();
  if (!data.byRoom) data.byRoom = {};
  if (!data.byUser) data.byUser = {};
  if (!data.payProofs) data.payProofs = {};
  if (!data.payUsers) data.payUsers = {};
  if (!data.pendingPayImages) data.pendingPayImages = {};
  if (!data.pending) data.pending = {};
  if (!data.flags) data.flags = {};
  let dirty = false;
  const justBound = [];
  for (const ev of body.events || []) {
    const userId = ev.source && ev.source.userId;
    const replyToken = ev.replyToken;
    if (ev.type === "follow") {
      if (replyToken) await reply(replyToken, LINE_WELCOME);
      continue;
    }
    if (ev.type !== "message") continue;
    const msg = ev.message || {};
    const text = msg.type === "text" ? String(msg.text || "").trim() : "";
    const payLike = /繳費通知|已繳本月|已繳費|轉帳截圖/.test(text);
    const resolved = text && !payLike ? await resolveBindPhrase(text) : { hit: null };
    const room = resolved.hit ? resolved.hit.room : "";
    const name = resolved.hit ? resolved.hit.name : "";
    if (userId && room && name && replyToken) {
      const now = Date.now();
      const st = await loadRentState();
      const d = lbDecide(st, room, name);
      if (d.kind === "bind") {
        data.byUser[userId] = { room, name: d.t.name, at: now };
        data.byRoom[room] = { userId, name: d.t.name, at: now };
        delete data.pending[userId];
        dirty = true;
        justBound.push({ room, userId });
        await reply(replyToken, "已綁定 " + room + " " + d.t.name);
      } else if (d.kind === "mismatch") {
        data.flags[userId] = { room, name, at: now, reason: "mismatch" };
        dirty = true;
        await reply(replyToken, LB_MISMATCH);
        try {
          await fetch(STATE_HOOK + "/api/push", {
            method: "POST",
            headers: { "X-Tongjie-Key": STATE_KEY, "Content-Type": "application/json" },
            body: JSON.stringify({ target: "admin", title: "LINE綁定待確認", body: room + " " + name + "：姓名與租客資料不符", noLine: true })
          });
        } catch {}
      } else {
        data.pending[userId] = { room, name, at: now };
        dirty = true;
        await reply(replyToken, lbPendingText(room, name));
      }
      continue;
    }
    if (resolved.reply && replyToken) {
      await reply(replyToken, resolved.reply);
      continue;
    }
    const bound = boundRoomOf(data, userId);
    const isImg = msg.type === "image" || msg.type === "video" || msg.type === "file";
    const isPayText = /繳費通知|已繳本月|已繳費|轉帳截圖/.test(text);
    const fromText = roomFromPayText(text);
    const target = bound || fromText || payUserRoom(data, userId);
    if (isPayText && target) {
      rememberPayUser(data, userId, target, bound ? "" : nameFromPayText(text, target));
      let proof = notePayProof(data, target, "text");
      if (takePendingImage(data, userId)) proof = notePayProof(data, target, "image");
      dirty = true;
      if (!roomUser(data.byRoom && data.byRoom[target])) justBound.push({ room: target, userId });
      if (replyToken) await reply(replyToken, payProofReply(proof) || "已收到");
      continue;
    }
    if (isImg) {
      const imgRoom = target || payUserRoom(data, userId);
      const existing = imgRoom && data.payProofs && data.payProofs[imgRoom];
      const awaitingText = !!(existing && existing.ym === payYmNow() && existing.hasText);
      if (imgRoom && awaitingText) {
        rememberPayUser(data, userId, imgRoom);
        const proof = notePayProof(data, imgRoom, "image");
        dirty = true;
        if (!roomUser(data.byRoom && data.byRoom[imgRoom])) justBound.push({ room: imgRoom, userId });
        if (replyToken) await reply(replyToken, payProofReply(proof) || "已收到");
      } else {
        notePendingImage(data, userId, imgRoom);
        dirty = true;
      }
      continue;
    }
    if (bound) {
      if (userId) justBound.push({ room: bound, userId });
      continue;
    }
  }
  if (dirty) await saveBinds(data);
  if (justBound.length) {
    try { await syncLineFaces(justBound); } catch (e) {}
  }
  return new Response("OK", { status: 200 });
}
