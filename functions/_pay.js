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
    payProofs[no] = { ym: p.ym || "", hasText: !!p.hasText, hasImage: !!p.hasImage, at: Number(p.at) || 0, early: !!p.early };
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
// separators people put between 房號 and 姓名 (space, - _ + / , . : ; ~ * # 、 。 etc.): everything that is not a letter, mark or digit
function bindSep(s) {
  return String(s || "").normalize("NFKC").replace(/[^\p{L}\p{M}\p{N}]/gu, "");
}
function normBindName(s) {
  return bindSep(s);
}
function cleanBindName(name) {
  // keep inner characters (a record like 甲、乙 stays as is); drop spaces, edge separators and 租客
  let s = String(name || "").normalize("NFKC").replace(/[\s\u3000]/g, "").replace(/^[^\p{L}\p{M}\p{N}]+|[^\p{L}\p{M}\p{N}]+$/gu, "");
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
// "7632 王小明", "王小明 7632", "7632-王小明", "7632，王小明", "７６３２王小明", "7632號 王小明" ...
// one 4-digit room (optional 號/室/房) plus a short name, in either order, any separators; free sentences are not a bind
function parseRoomName(raw) {
  const text = String(raw || "").normalize("NFKC").trim();
  if (!text || text.length > 40) return null;
  const re = /(?<!\d)(\d{4})(?!\d)(?:\s*[號室房])?/g;
  let m, hit = null;
  while ((m = re.exec(text))) { if (roomOk(m[1])) { hit = m; break; } }
  if (!hit) return null;
  let rest = text.slice(0, hit.index) + " " + text.slice(hit.index + hit[0].length);
  rest = rest.replace(/\d{1,2}\s*月份?(?:的)?(?:房租|租金)?|房租|租金/g, " ");
  if (/\d/.test(rest)) return null;
  rest = rest.replace(/(^|[^\p{L}\p{M}])我(?:是|叫)/u, "$1");
  const name = bindSep(cleanBindName(rest));
  if (!name) return null;
  const cjk = /^[\u3400-\u9fff々]+$/.test(name);
  if (cjk ? (name.length < 2 || name.length > 6) : (name.length < 2 || name.length > 24)) return null;
  if (roomOk(name)) return null;
  return { room: hit[1], name };
}
function parseBindPhrase(text) {
  const raw = String(text || "").normalize("NFKC").trim().replace(/\s+/g, " ");
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
  const prev = data.payUsers[userId];
  if (name) row.name = String(name);
  else if (prev && prev.name && String(prev.room) === String(room)) row.name = prev.name;
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
function notePayProof(data, room, kind, forYm) {
  const no = String(room || "");
  if (!/^\d{4}$/.test(no)) return null;
  const ym = /^\d{4}-\d{2}$/.test(String(forYm || "")) ? String(forYm) : payYmNow();
  if (!data.payProofs) data.payProofs = {};
  const cur = (data.payProofs[no] && data.payProofs[no].ym === ym)
    ? data.payProofs[no]
    : { ym, hasText: false, hasImage: false };
  if (ym !== payYmNow()) cur.early = true;
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
const LB_MISMATCH = "房號和姓名還沒對上，請再傳一次，例如 7051 許光漢。姓名請用租約上的全名，已通知管理員協助。";
const LB_HINT = "請傳「房號 姓名」，例如 7051 許光漢，我們就能幫您對帳。";
function lbPendingText(room, name) {
  return "已收到 " + room + " " + name + "。目前還沒有這間的入住資料，資料建立後會自動完成綁定。";
}
function lbAt(v) { return v && typeof v === "object" ? Number(v.at) || 0 : 0; }
function lbNorm(s) {
  let x = bindSep(s);
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
      let extra = "";
      if (p.receipt) {
        const due = xferRentDue(t, room, ym);
        const amt = Number(p.receipt.amount) || 0;
        if (amt && due && amt !== due) extra += "　轉帳 " + amt.toLocaleString("zh-TW") + " 元（應繳 " + due.toLocaleString("zh-TW") + " 元，請核對）";
        if (p.receipt.toOk === false) extra += "　轉入帳號不是公司帳戶，請核對";
      }
      noted.push(no + " " + (t.name || "") + "　實繳日 " + t.remitOn + extra);
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

// ---- Bank transfer receipt text (2026-11-27) ----
// Taiwan bank apps let the payer share / copy an editable result text; there is no fixed
// template, so this is a tolerant keyword parser (success words + amount + account tails).
const XFER_OK = "已收到轉帳資料，謝謝";
const XFER_EARLY_OK = "已收到轉帳資料，這筆會記為下個月的預繳房租，謝謝";
const XFER_ASK = "已收到轉帳資料，請再傳「房號 姓名」，方便我們對帳。";
const XFER_COMPANY_ACCTS = ["04009039686", "00897210912150", "010100035909", "010100034775"];
function xferNorm(text) {
  return String(text || "")
    .replace(/[\uFF10-\uFF19]/g, c => String.fromCharCode(c.charCodeAt(0) - 65248))
    .replace(/[＊]/g, "*").replace(/[：]/g, ":").replace(/[，]/g, ",").replace(/\u3000/g, " ");
}
function xferMoney(str) {
  const n = Number(String(str || "").replace(/[,\s]/g, ""));
  return n >= 100 && n <= 300000 ? Math.round(n) : 0;
}
function xferTail(tok) {
  const runs = String(tok || "").match(/\d+/g) || [];
  if (!runs.length) return "";
  const last = runs[runs.length - 1];
  return last.length > 5 ? last.slice(-5) : last;
}
function xferCompanyTail(tail) {
  const t = String(tail || "");
  return t.length >= 4 && XFER_COMPANY_ACCTS.some(a => a.endsWith(t));
}
export function parseTransferText(text, opt) {
  const ocr = !!(opt && opt.ocr);
  const s = xferNorm(text);
  if (!s.trim() || s.length > (ocr ? 3000 : 600)) return null;
  if (/尚未入帳|請匯至|請以現金|繳費通知|未成功|退款|退回/.test(s)) return null;
  if (ocr ? /(交易|轉帳|匯款)\s*(失敗|取消)/.test(s) : /失敗|取消/.test(s)) return null;
  if (!ocr && /明天|晚點|晚一點|等一下|等等|下週|下禮拜|會轉|會匯|再轉|再匯|要轉|要匯|準備/.test(s)) return null;
  const success = /(轉帳|匯款|轉出|轉入|交易|付款|支付|匯出)\s*(已)?\s*(成功|完成)|成功\s*(轉出|轉帳|匯出|匯款)|(轉|匯)(了|新[臺台]幣|NT\$|\$)[^\n]{0,20}?給(你|您)|已(經)?\s*(成功)?\s*(轉帳|匯款|轉出|轉入|匯出|轉了|匯了|轉過去|匯過去)|轉好了|匯好了|轉帳結果|交易結果|轉帳明細|交易明細|通知收款人/.test(s);
  let amount = 0;
  let m = s.match(/(?:轉帳|匯款|轉出|轉入|交易|付款|支付)?金額[^\d\n]{0,12}?(\d[\d,]*(?:\.\d{1,2})?)/);
  if (m) amount = xferMoney(m[1]);
  if (!amount && (m = s.match(/(?:NT\$|NTD|TWD|新[臺台]幣|\$)\s*(\d[\d,]*)/i))) amount = xferMoney(m[1]);
  if (!amount && (m = s.match(/(\d[\d,]{2,})\s*元/))) amount = xferMoney(m[1]);
  if (!amount && success && (m = s.match(/(^|[^\d,])(\d{1,3}(?:,\d{3})+)(?![\d,])/))) amount = xferMoney(m[2]);
  const said = s.match(/[末未後][五5]碼\s*(?:是|為|:)?\s*(\d{5})(?!\d)/);
  if (!amount && success && !ocr) {
    const bare = s.replace(/[末未後][五5]碼\s*(?:是|為|:)?\s*\d+/g, " ").replace(/\d{2,4}[\/\-.]\d{1,2}[\/\-.]\d{1,2}/g, " ").replace(/\d{1,2}:\d{2}(:\d{2})?/g, " ")
      .match(/(^|[^\d*\-])(\d{3,6})(?![\d*\-])/);
    if (bare && !roomOk(bare[2])) amount = xferMoney(bare[2]);
  }
  let toTail = "", fromTail = "", companyHit = false;
  const flat = s.replace(/[\s\-]/g, "");
  const coAcct = XFER_COMPANY_ACCTS.find(a => flat.indexOf(a) >= 0);
  if (coAcct) companyHit = true;
  if (said) { if (xferCompanyTail(said[1])) toTail = said[1]; else fromTail = said[1]; }
  const outRun = s.match(/([0-9*]{5,})\s*成功\s*轉出/);
  if (outRun && !fromTail) fromTail = xferTail(outRun[1]);
  s.split(/\n+/).forEach(raw => {
    const line = raw.replace(/\d{2,4}[\/\-.]\d{1,2}[\/\-.]\d{1,2}/g, " ").replace(/\d{1,2}:\d{2}(:\d{2})?/g, " ");
    const tok = (line.match(/[0-9*xX×•●·]{4,}[0-9*xX×•●·\- ]*/g) || []).filter(t => (t.match(/\d/g) || []).length >= 3 && !/^\d{1,4}[\/.]\d/.test(t));
    if (!tok.length) return;
    const tail = xferTail(tok[tok.length - 1]);
    if (!tail) return;
    if (/轉入|收款|受款|存入|入帳|對方|收方/.test(line)) { if (!toTail) toTail = tail; }
    else if (/轉出|付款|扣款|匯款人|來源|我的|本人|卡號/.test(line)) { if (!fromTail) fromTail = tail; }
    else if (/末[五5]碼|後[五5]碼|帳號|帳戶/.test(line)) {
      if (xferCompanyTail(tail)) { if (!toTail) toTail = tail; }
      else if (!fromTail) fromTail = tail;
    }
  });
  if (toTail && xferCompanyTail(toTail)) companyHit = true;
  if (coAcct && !toTail) toTail = coAcct.slice(-5);
  const ok = ocr
    ? !!(success && amount && (companyHit || /^\d{5}$/.test(fromTail)))
    : (amount && (success || companyHit)) || (companyHit && success) || (success && !!said);
  if (!ok) return null;
  return { amount, toTail, fromTail, companyHit, toOk: !toTail || xferCompanyTail(toTail) };
}
function xferRentDue(t, r, ym) {
  const y = String(ym || "").slice(0, 7);
  const parts = Array.isArray(t && t.leases) ? t.leases : [];
  const part = parts.find(p => p && String(p.start || "").slice(0, 7) <= y && String(p.end || "").slice(0, 7) >= y);
  if (part && Number(part.rent) > 0) return Math.round(Number(part.rent));
  if (part && part.kind === "stub" && Number(t && t.stubRent) > 0) return Math.round(Number(t.stubRent));
  const n = Number(t && t.rent) || Number(r && r.rent) || 0;
  return n > 0 ? Math.round(n) : 0;
}
function xferPaidYm(t, ym) {
  if ((t.prepaidYm || []).some(y => String(y).slice(0, 7) === ym)) return true;
  if (t.paid && String(t.paidYm || "").slice(0, 7) === ym) return true;
  const on = String(t.remitOn || "").slice(0, 10);
  return !!(on && on.slice(0, 7) === ym);
}
// Unique source-account tail + exact unpaid rent; never amount alone.
function xferAutoMatch(state, data, x) {
  if (!state || !x || !/^\d{5}$/.test(String(x.fromTail || "")) || !x.amount || !x.toOk) return null;
  const ym = payYmNow();
  const hits = [];
  (state.tenants || []).forEach(t => {
    if (!t || t.former || t.incoming || t.demo || t.prospect || t.applyPending) return;
    if (String(t.bankLast5 || "").trim() !== x.fromTail) return;
    const room = (state.rooms || []).find(r => r && r.id === t.roomId);
    if (!room || room.demo || room.kind === "factory" || !roomOk(room.no)) return;
    hits.push({ t, room });
  });
  if (hits.length !== 1) return null;
  const { t, room } = hits[0];
  const no = String(room.no);
  if (roomUser(data.byRoom && data.byRoom[no])) return null;
  if (xferPaidYm(t, ym)) return null;
  if (xferRentDue(t, room, ym) !== x.amount) return null;
  return { room: no, name: t.name || "" };
}
// Memo like "7632 王小明 11月房租", "7632-王小明", "王小明 7632": bind only when the name exactly matches that room's tenant.
function xferMemoBind(state, data, text, userId) {
  const base = String(text || "").normalize("NFKC");
  const CJK = "[\\u3400-\\u9fff々]";
  const SEP = "[^\\p{L}\\p{M}\\p{N}]*";
  const reRoomFirst = new RegExp("(?<!\\d)(\\d{4})(?!\\d)(?:\\s*[號室房])?" + SEP + "(" + CJK + "{2,6})", "gu");
  const reNameFirst = new RegExp("(" + CJK + "{2,6})" + SEP + "(?<!\\d)(\\d{4})(?!\\d)", "gu");
  const tryName = (no, run, fromEnd) => {
    if (!roomOk(no)) return null;
    const owner = roomUser(data.byRoom && data.byRoom[no]);
    if (owner && owner !== userId) return null;
    for (let n = Math.min(run.length, 4); n >= 2; n--) {
      const nm = fromEnd ? run.slice(run.length - n) : run.slice(0, n);
      const d = lbDecide(state, no, nm);
      if (d.kind === "bind") return { room: no, name: d.t.name || "" };
    }
    return null;
  };
  for (const s of [base, base.replace(/[ \t]+/g, "")]) {
    let m;
    reRoomFirst.lastIndex = 0;
    while ((m = reRoomFirst.exec(s))) { const hit = tryName(m[1], m[2], false); if (hit) return hit; }
    reNameFirst.lastIndex = 0;
    while ((m = reNameFirst.exec(s))) { const hit = tryName(m[2], m[1], true); if (hit) return hit; }
  }
  return null;
}
// APP-32: a transfer/slip that arrives at month-end (day >= EARLY_PAY_DAY, Taipei) from a tenant whose current month is already paid is next month's rent paid early (預繳).
const EARLY_PAY_DAY = 28;
function taipeiYmdNow() {
  try { return new Date().toLocaleString("sv-SE", { timeZone: "Asia/Taipei" }).slice(0, 10); }
  catch { return new Date().toISOString().slice(0, 10); }
}
function nextYmStr(ym) {
  let y = Number(String(ym || "").slice(0, 4)), m = Number(String(ym || "").slice(5, 7)) + 1;
  if (!y || !m) return "";
  if (m > 12) { m = 1; y += 1; }
  return y + "-" + String(m).padStart(2, "0");
}
// Returns the next month ("YYYY-MM") when this slip is an early payment for it, else "". Never writes anything.
function earlyPayFor(state, no, amount, ymd) {
  const today = String(ymd || taipeiYmdNow());
  const ym = today.slice(0, 7);
  if (Number(today.slice(8, 10)) < EARLY_PAY_DAY) return "";
  if (!state || !roomOk(no)) return "";
  const room = (state.rooms || []).find(r => r && String(r.no) === String(no));
  if (!room || room.demo || room.kind === "factory") return "";
  const t = (state.tenants || []).find(x => x && x.roomId === room.id && !x.former && !x.incoming && !x.demo && !x.prospect && !x.applyPending);
  if (!t) return "";
  const next = nextYmStr(ym);
  if (!next || !xferPaidYm(t, ym) || xferPaidYm(t, next)) return "";
  const end = String(t.leaseEnd || "").slice(0, 7);
  if (end && end < next) return "";
  const due = xferRentDue(t, room, next);
  const amt = Math.round(Number(amount) || 0);
  if (amt && (!due || amt !== due)) return "";
  return next;
}
async function earlyPayYm(no, amount) {
  try {
    if (Number(taipeiYmdNow().slice(8, 10)) < EARLY_PAY_DAY) return "";
    return earlyPayFor(await loadRentState(), no, amount);
  } catch { return ""; }
}
function noteXferProof(data, room, x, forYm) {
  const p = notePayProof(data, room, "text", forYm);
  if (!p) return null;
  p.hasImage = true;
  p.receipt = { amount: x.amount || 0, toTail: x.toTail || "", fromTail: x.fromTail || "", toOk: x.toOk !== false };
  return p;
}
async function xferAdminPush(title, body) {
  try {
    await fetch(STATE_HOOK + "/api/push", {
      method: "POST",
      headers: { "X-Tongjie-Key": STATE_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({ target: "admin", title, body, noLine: true })
    });
  } catch {}
}
function xferDesc(x) {
  return ["金額 " + (x.amount ? x.amount.toLocaleString("zh-TW") + " 元" : "未知"),
    x.toTail ? "轉入末碼 " + x.toTail + (x.toOk === false ? "（不是公司帳戶）" : "") : "",
    x.fromTail ? "轉出末碼 " + x.fromTail : ""].filter(Boolean).join("，");
}
const LINE_ACK = "收到，管理員會與您聯繫。";
async function ackDue(userId) {
  if (!userId) return false;
  const url = "https://internal/line-acks";
  let m = {};
  try {
    const hit = await caches.default.match(url);
    if (hit) m = (await hit.json()) || {};
  } catch {}
  const now = Date.now();
  if (now - (Number(m[userId]) || 0) < 6 * 3600 * 1000) return false;
  m[userId] = now;
  Object.keys(m).forEach(k => { if (now - (Number(m[k]) || 0) > 24 * 3600 * 1000) delete m[k]; });
  try {
    await caches.default.put(url, new Response(JSON.stringify(m), {
      headers: { "Cache-Control": "max-age=86400", "Content-Type": "application/json" }
    }));
  } catch {}
  return true;
}
// Throttled, best-effort: pay-report users / LINE photos stored in this edge location
// become real bindings in the worker store. Safe to call often.
export async function kickRecover() {
  const url = "https://internal/recover-at";
  try {
    const hit = await caches.default.match(url);
    const last = hit ? Number(await hit.text()) : 0;
    if (Date.now() - last < 10 * 60 * 1000) return null;
    await caches.default.put(url, new Response(String(Date.now()), { headers: { "Cache-Control": "max-age=600" } }));
  } catch {}
  try { return await recoverLineBinds(); } catch { return null; }
}

// ---- LINE image OCR (2026-11-27) ----
// Failover: Google Vision -> Gemini Flash (free) -> Cloudflare Workers AI.
// Returns the text ("" = no text found) or null on any error / no provider (caller keeps old behavior).
const OCR_GEMINI_MODELS = ["gemini-3.5-flash-lite", "gemini-3.1-flash-lite", "gemini-3.5-flash"];
const OCR_CF_MODELS = ["@cf/moondream/moondream3.1-9B-A2B", "@cf/meta/llama-3.2-11b-vision-instruct"];
const OCR_PROMPT = "這是一張圖片。只把圖上看得見的文字依原樣全部抄下來，不要翻譯、不要解說。看不清楚就略過。";
function b64FromBuf(buf) {
  const u = new Uint8Array(buf);
  let out = "";
  for (let i = 0; i < u.length; i += 0x8000) out += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000));
  return btoa(out);
}
function ocrKeys(env) {
  const vis = String((env && (env.GOOGLE_VISION_KEY || env.LINE_OCR_KEY)) || "").trim();
  const gem = String((env && (env.GEMINI_API_KEY || env.GOOGLE_VISION_KEY || env.LINE_OCR_KEY)) || "").trim();
  return { vis, gem };
}
function ocrTextOf(v) {
  const s = String(v || "").trim();
  return s ? s : "";
}
async function ocrViaVision(key, b64) {
  if (!key) return null;
  const g = await fetch("https://vision.googleapis.com/v1/images:annotate?key=" + encodeURIComponent(key), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal: AbortSignal.timeout(12000),
    body: JSON.stringify({ requests: [{ image: { content: b64 }, features: [{ type: "DOCUMENT_TEXT_DETECTION" }], imageContext: { languageHints: ["zh-Hant", "en"] } }] })
  });
  if (!g.ok) return null;
  const j = await g.json();
  const r = j && j.responses && j.responses[0];
  if (!r || r.error) return null;
  return ocrTextOf((r.fullTextAnnotation && r.fullTextAnnotation.text) || (r.textAnnotations && r.textAnnotations[0] && r.textAnnotations[0].description) || "");
}
async function ocrViaGemini(key, b64, budget) {
  if (!key) return null;
  for (let i = 0; i < OCR_GEMINI_MODELS.length; i++) {
    try {
      const g = await fetch("https://generativelanguage.googleapis.com/v1beta/models/" + encodeURIComponent(OCR_GEMINI_MODELS[i]) + ":generateContent?key=" + encodeURIComponent(key), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(Math.max(2000, Math.min(12000, budget == null ? 12000 : budget))),
        body: JSON.stringify({
          contents: [{ parts: [{ inlineData: { mimeType: "image/jpeg", data: b64 } }, { text: OCR_PROMPT }] }],
          generationConfig: { temperature: 0 }
        })
      });
      if (!g.ok) continue;
      const data = await g.json().catch(() => null);
      if (!data || data.error) continue;
      const text = ((((data.candidates || [])[0] || {}).content || {}).parts || []).map(p => p && p.text).filter(Boolean).join("\n");
      if (String(text || "").trim()) return ocrTextOf(text);
    } catch {}
  }
  return null;
}
function ocrPickAiText(res) {
  if (res == null) return "";
  if (typeof res === "string") return res;
  if (typeof res.response === "string") return res.response;
  if (typeof res.text === "string") return res.text;
  if (typeof res.description === "string") return res.description;
  if (typeof res.answer === "string") return res.answer;
  if (res.result != null) return ocrPickAiText(res.result);
  const d = res.description || res.caption;
  if (typeof d === "string") return d;
  if (Array.isArray(res)) return res.map(ocrPickAiText).filter(Boolean).join("\n");
  return "";
}
async function ocrViaWorkersAi(env, b64, budget) {
  const ai = env && env.AI;
  if (!ai || typeof ai.run !== "function") return null;
  const dataUri = "data:image/jpeg;base64," + b64;
  for (let i = 0; i < OCR_CF_MODELS.length; i++) {
    const model = OCR_CF_MODELS[i];
    const tries = model.indexOf("moondream") >= 0
      ? [{ image: dataUri, task: "query", question: OCR_PROMPT }, { image: dataUri, prompt: OCR_PROMPT }]
      : [{ image: dataUri, prompt: OCR_PROMPT, max_tokens: 800 }, { messages: [{ role: "user", content: [{ type: "image_url", image_url: { url: dataUri } }, { type: "text", text: OCR_PROMPT }] }] }];
    for (let t = 0; t < tries.length; t++) {
      try {
        const res = await Promise.race([
          ai.run(model, tries[t]),
          new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), Math.max(2000, Math.min(12000, budget == null ? 12000 : budget))))
        ]);
        const text = ocrPickAiText(res);
        if (String(text || "").trim()) return ocrTextOf(text);
      } catch {}
    }
  }
  return null;
}
// Exported so /vision-ocr and tests can use the same failover. last.provider is for tests only (never sent to LINE).
export const ocrLast = { provider: "" };
export async function ocrImageFromBase64(env, b64) {
  ocrLast.provider = "";
  const image = String(b64 || "").replace(/^data:image\/[^;]+;base64,/, "");
  if (!image) return null;
  const keys = ocrKeys(env);
  const until = Date.now() + 40000;
  const left = () => until - Date.now();
  try {
    if (left() > 2000) {
      const vis = await ocrViaVision(keys.vis, image);
      if (vis != null) { ocrLast.provider = "vision"; return vis; }
    }
  } catch {}
  try {
    if (left() > 2000) {
      const gem = await ocrViaGemini(keys.gem, image, left());
      if (gem != null) { ocrLast.provider = "gemini"; return gem; }
    }
  } catch {}
  try {
    if (left() > 2000) {
      const ai = await ocrViaWorkersAi(env, image, left());
      if (ai != null) { ocrLast.provider = "workers-ai"; return ai; }
    }
  } catch {}
  return null;
}
async function lineImageText(env, msg) {
  if (!msg || msg.type !== "image" || !msg.id) return null;
  if (msg.contentProvider && msg.contentProvider.type && msg.contentProvider.type !== "line") return null;
  const keys = ocrKeys(env);
  if (!keys.vis && !keys.gem && !(env && env.AI)) return null;
  try {
    const token = await lineToken();
    if (!token) return null;
    const img = await fetch("https://api-data.line.me/v2/bot/message/" + encodeURIComponent(msg.id) + "/content", {
      headers: { Authorization: "Bearer " + token }, signal: AbortSignal.timeout(10000)
    });
    if (!img.ok) return null;
    const buf = await img.arrayBuffer();
    if (!buf.byteLength || buf.byteLength > 6000000) return null;
    return await ocrImageFromBase64(env, b64FromBuf(buf));
  } catch { return null; }
}


export async function handleLineEvents(request, env) {
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
    const xfer = text && !payLike ? parseTransferText(text) : null;
    const resolved = text && !payLike && !xfer ? await resolveBindPhrase(text) : { hit: null };
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
        const fl = data.flags[userId];
        const px = fl && fl.xfer && fl.xfer.ym === payYmNow() ? fl.xfer : null;
        if (px) {
          rememberPayUser(data, userId, room, d.t.name);
          const fy = await earlyPayYm(room, px.amount);
          noteXferProof(data, room, px, fy);
          delete data.flags[userId];
          await reply(replyToken, "已綁定 " + room + " " + d.t.name + "\n" + (fy ? XFER_EARLY_OK : XFER_OK));
        } else {
          await reply(replyToken, "已綁定 " + room + " " + d.t.name);
        }
      } else if (d.kind === "mismatch") {
        const keepX = data.flags[userId] && data.flags[userId].xfer;
        data.flags[userId] = { room, name, at: now, reason: "mismatch" };
        if (keepX) data.flags[userId].xfer = keepX;
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
    if (!bound && userId && replyToken && /^[?？¿\s]+$/.test(text) && /\?|？/.test(text)) {
      const fl = data.flags[userId];
      if ((fl && (fl.xfer || fl.reason === "mismatch" || fl.reason === "xfer")) || data.pending[userId]) {
        await reply(replyToken, LB_HINT);
        continue;
      }
    }
    const isImg = msg.type === "image" || msg.type === "video" || msg.type === "file";
    const isPayText = /繳費通知|已繳本月|已繳費|轉帳截圖/.test(text);
    const fromText = roomFromPayText(text);
    const target = bound || fromText || payUserRoom(data, userId);
    const doXfer = async (xfer, srcText) => {
      let room = target;
      let boundNow = "";
      if (!room && userId) {
        const st = await loadRentState();
        const hit = (xfer.toOk ? xferMemoBind(st, data, srcText, userId) : null) || xferAutoMatch(st, data, xfer);
        if (hit) {
          const now = Date.now();
          data.byUser[userId] = { room: hit.room, name: hit.name, at: now };
          data.byRoom[hit.room] = { userId, name: hit.name, at: now, via: "xfer" };
          delete data.pending[userId];
          room = hit.room;
          boundNow = "已綁定 " + hit.room + " " + hit.name + "\n";
          justBound.push({ room: hit.room, userId });
        }
      }
      if (room) {
        rememberPayUser(data, userId, room, "");
        const fy = await earlyPayYm(room, xfer.amount);
        noteXferProof(data, room, xfer, fy);
        takePendingImage(data, userId);
        if (data.flags[userId] && data.flags[userId].xfer) delete data.flags[userId];
        dirty = true;
        if (replyToken) await reply(replyToken, boundNow + (fy ? XFER_EARLY_OK : XFER_OK));
      } else if (userId) {
        const prev = data.flags[userId] || {};
        data.flags[userId] = Object.assign({}, prev, { at: Date.now(), reason: prev.reason || "xfer",
          xfer: { ym: payYmNow(), amount: xfer.amount || 0, toTail: xfer.toTail || "", fromTail: xfer.fromTail || "", toOk: xfer.toOk !== false, at: Date.now() } });
        dirty = true;
        if (replyToken) await reply(replyToken, XFER_ASK);
        await xferAdminPush("LINE轉帳待對帳", "未綁定的 LINE 傳來轉帳資料：" + xferDesc(xfer) + "。已請對方傳房號姓名。");
      }
    };
    if (xfer) {
      await doXfer(xfer, text);
      continue;
    }
    if (isPayText && target) {
      rememberPayUser(data, userId, target, bound ? "" : nameFromPayText(text, target));
      const fy = await earlyPayYm(target, 0);
      let proof = notePayProof(data, target, "text", fy);
      if (takePendingImage(data, userId)) proof = notePayProof(data, target, "image", fy);
      dirty = true;
      if (!roomUser(data.byRoom && data.byRoom[target])) justBound.push({ room: target, userId });
      if (replyToken) await reply(replyToken, payProofReply(proof) || "已收到");
      continue;
    }
    if (isImg) {
      const seen = msg.type === "image" ? await lineImageText(env, msg) : null;
      if (seen !== null) {
        const ox = parseTransferText(seen, { ocr: true });
        if (ox) {
          await doXfer(ox, seen);
          continue;
        }
      }
      const imgRoom = target || payUserRoom(data, userId);
      const existing = imgRoom && data.payProofs && data.payProofs[imgRoom];
      const awaitingText = !!(existing && existing.hasText && (existing.ym === payYmNow() || (existing.early && existing.ym === nextYmStr(payYmNow()))));
      if (imgRoom && awaitingText) {
        rememberPayUser(data, userId, imgRoom);
        const proof = notePayProof(data, imgRoom, "image", existing.ym);
        dirty = true;
        if (!roomUser(data.byRoom && data.byRoom[imgRoom])) justBound.push({ room: imgRoom, userId });
        if (replyToken) await reply(replyToken, payProofReply(proof) || "已收到");
      } else {
        const pend = data.pendingPayImages[userId];
        const firstImg = !(pend && pend.ym === payYmNow());
        notePendingImage(data, userId, imgRoom);
        dirty = true;
        if (seen !== null) {
          // Read OK and not a transfer: no pay wording. Bound tenants get the plain ack (throttled).
          if (bound && replyToken && await ackDue(userId)) await reply(replyToken, LINE_ACK);
        } else if (imgRoom && firstImg && replyToken) await reply(replyToken, payProofReply({ hasImage: true }));
      }
      continue;
    }
    if (bound) {
      if (userId) justBound.push({ room: bound, userId });
      if (msg.type === "text" && text && replyToken && await ackDue(userId)) await reply(replyToken, LINE_ACK);
      continue;
    }
  }
  if (dirty) await saveBinds(data);
  if (justBound.length) {
    try { await syncLineFaces(justBound); } catch (e) {}
  }
  return new Response("OK", { status: 200 });
}
