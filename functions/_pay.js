const BIND_URL = "https://internal/binds";
const HINT = "請傳送「房號 姓名」，例如 6821 黃宥宇";
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
function rememberPayUser(data, userId, room) {
  if (!userId || !/^\d{4}$/.test(String(room || ""))) return;
  if (!data.payUsers) data.payUsers = {};
  data.payUsers[userId] = { room: String(room), ym: payYmNow(), at: Date.now() };
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
  if (p.hasText && p.hasImage) return "已收到繳費回報與截圖，請回 App 點「本月已繳費」";
  if (p.hasImage) return "已收到截圖，請再傳送繳費回報文字（可從 App 點上方按鈕帶入）";
  if (p.hasText) return "已收到回報，請再傳轉帳截圖";
  return "";
}

export async function getBinds() {
  const hit = await caches.default.match(BIND_URL);
  return hit ? hit.json() : { byRoom: {}, byUser: {}, payProofs: {} };
}
export async function saveBinds(data) {
  await caches.default.put(BIND_URL, new Response(JSON.stringify(data), {
    headers: { "Cache-Control": "max-age=31536000" }
  }));
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
  const buf = await img.arrayBuffer();
  if (!buf || buf.byteLength < 80 || buf.byteLength > 180000) return "";
  const type = String(img.headers.get("content-type") || "image/jpeg").split(";")[0];
  if (!/^image\//.test(type)) return "";
  return "data:" + type + ";base64," + bytesToB64(new Uint8Array(buf));
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
    const res = await fetch(STATE_HOOK + "/binds", { cache: "no-store" });
    if (!res.ok) return { byRoom: {} };
    return await res.json();
  } catch { return { byRoom: {} }; }
}
function roomUser(row) {
  if (!row) return "";
  if (typeof row === "string") return row;
  return row.userId || "";
}
export async function syncLineFaces(only) {
  const local = await getBinds();
  const remote = await workerBinds();
  const byRoom = Object.assign({}, local.byRoom || {}, remote.byRoom || {});
  const cache = await loadFaceCache();
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
  let dirty = false;
  const justBound = [];
  for (const ev of body.events || []) {
    const userId = ev.source && ev.source.userId;
    const replyToken = ev.replyToken;
    if (ev.type === "follow" && replyToken) {
      await reply(replyToken, HINT);
      continue;
    }
    if (ev.type !== "message") continue;
    const msg = ev.message || {};
    const text = msg.type === "text" ? String(msg.text || "").trim() : "";
    const m = text.match(/^(\d{4})\s+(.+)$/);
    const room = m ? m[1] : "";
    const name = m ? m[2].trim() : "";
    const okRoom = /^(68|70|72|76)\d{2}$/.test(room);
    if (userId && okRoom && name && replyToken) {
      data.byUser[userId] = { room, name };
      data.byRoom[room] = { userId, name };
      dirty = true;
      justBound.push({ room, userId });
      await reply(replyToken, "已綁定 " + room + " " + name);
      continue;
    }
    const bound = boundRoomOf(data, userId);
    const isImg = msg.type === "image" || msg.type === "video" || msg.type === "file";
    const isPayText = /繳費通知|已繳本月|已繳費|轉帳截圖/.test(text);
    const fromText = roomFromPayText(text);
    const target = bound || fromText || payUserRoom(data, userId);
    if (isPayText && target) {
      rememberPayUser(data, userId, target);
      let proof = notePayProof(data, target, "text");
      if (takePendingImage(data, userId)) proof = notePayProof(data, target, "image");
      dirty = true;
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
        if (replyToken) await reply(replyToken, payProofReply(proof) || "已收到");
      } else {
        notePendingImage(data, userId, imgRoom);
        dirty = true;
        if (replyToken && !bound) {
          await reply(replyToken, "已收到圖片。若是繳費截圖，請再傳送回報文字（可從 App 點上方按鈕帶入）");
        }
      }
      continue;
    }
    if (bound) continue;
    if (replyToken) await reply(replyToken, HINT);
  }
  if (dirty) await saveBinds(data);
  if (justBound.length) {
    try { await syncLineFaces(justBound); } catch (e) {}
  }
  return new Response("OK", { status: 200 });
}
