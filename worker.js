const CID = "2011285350";
const SEC = "478666c7c2aabed2b6c2ccb2a3a00ab2";
const APP_KEY = "tj-82934388";
const BIND_URL = "https://internal/binds";
const STATE_URL = "https://internal/app";
const PUSH_URL = "https://internal/push-subs";
const BUILD_URL = "https://internal/build";
const HINT = "請傳送「房號 姓名」，例如 6821 黃宥宇";
function payYmNow() {
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
const VAPID_PUBLIC = "BJB6y_l_IvFM91YDqrBmIAzUJZE_TM9QbxIIY1Nl14LoGHNfmAymDjDVYDdOmdAZU_VPs1fkaR9BM4voY4QjM3U";
const VAPID_PRIVATE = "FY7eYWJWbf1fihooAP5GwbY_kd3zRH-B4DG11twaR1o";
const VAPID_SUB = "mailto:tongjie@local";

function cors(data, status) {
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
function keyOk(request) {
  return request.headers.get("X-Tongjie-Key") === APP_KEY;
}
function b64urlToBytes(s) {
  s = String(s || "").replace(/-/g, "+").replace(/_/g, "/");
  const pad = "=".repeat((4 - (s.length % 4)) % 4);
  const bin = atob(s + pad);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
function bytesToB64url(u8) {
  let s = "";
  const arr = u8 instanceof Uint8Array ? u8 : new Uint8Array(u8);
  for (let i = 0; i < arr.length; i++) s += String.fromCharCode(arr[i]);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function concatBytes(...parts) {
  const n = parts.reduce((s, a) => s + a.length, 0);
  const o = new Uint8Array(n);
  let i = 0;
  parts.forEach(a => { o.set(a, i); i += a.length; });
  return o;
}
async function hkdf(ikm, salt, info, len) {
  const key = await crypto.subtle.importKey("raw", ikm, "HKDF", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "HKDF", hash: "SHA-256", salt, info }, key, len * 8);
  return new Uint8Array(bits);
}
async function importEcdhPublic(raw) {
  return crypto.subtle.importKey("raw", raw, { name: "ECDH", namedCurve: "P-256" }, true, []);
}
async function vapidSignKey() {
  const pub = b64urlToBytes(VAPID_PUBLIC);
  const x = bytesToB64url(pub.slice(1, 33));
  const y = bytesToB64url(pub.slice(33, 65));
  return crypto.subtle.importKey("jwk", {
    kty: "EC", crv: "P-256", x, y, d: VAPID_PRIVATE, ext: true
  }, { name: "ECDSA", namedCurve: "P-256" }, false, ["sign"]);
}
async function vapidJwt(endpoint, signKey) {
  const aud = new URL(endpoint).origin;
  const enc = new TextEncoder();
  const header = bytesToB64url(enc.encode(JSON.stringify({ typ: "JWT", alg: "ES256" })));
  const payload = bytesToB64url(enc.encode(JSON.stringify({
    aud, exp: Math.floor(Date.now() / 1000) + 12 * 3600, sub: VAPID_SUB
  })));
  const data = enc.encode(header + "." + payload);
  const sig = new Uint8Array(await crypto.subtle.sign({ name: "ECDSA", hash: "SHA-256" }, signKey, data));
  return header + "." + payload + "." + bytesToB64url(sig);
}
async function encryptPayload(sub, json) {
  const uaPub = b64urlToBytes(sub.keys && sub.keys.p256dh);
  const auth = b64urlToBytes(sub.keys && sub.keys.auth);
  const as = await crypto.subtle.generateKey({ name: "ECDH", namedCurve: "P-256" }, true, ["deriveBits"]);
  const asPub = new Uint8Array(await crypto.subtle.exportKey("raw", as.publicKey));
  const uaKey = await importEcdhPublic(uaPub);
  const secret = new Uint8Array(await crypto.subtle.deriveBits({ name: "ECDH", public: uaKey }, as.privateKey, 256));
  const enc = new TextEncoder();
  const ikm = await hkdf(secret, auth, concatBytes(enc.encode("WebPush: info\0"), uaPub, asPub), 32);
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const cek = await hkdf(ikm, salt, enc.encode("Content-Encoding: aes128gcm\0"), 16);
  const nonce = await hkdf(ikm, salt, enc.encode("Content-Encoding: nonce\0"), 12);
  const aes = await crypto.subtle.importKey("raw", cek, "AES-GCM", false, ["encrypt"]);
  const plain = concatBytes(enc.encode(json), new Uint8Array([2]));
  const cipher = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv: nonce }, aes, plain));
  const rs = new Uint8Array([0, 0, 16, 0]);
  return concatBytes(salt, rs, new Uint8Array([asPub.length]), asPub, cipher);
}
async function sendWebPush(sub, payload, signKey) {
  const body = await encryptPayload(sub, JSON.stringify(payload));
  const jwt = await vapidJwt(sub.endpoint, signKey);
  const res = await fetch(sub.endpoint, {
    method: "POST",
    headers: {
      Authorization: "vapid t=" + jwt + ", k=" + VAPID_PUBLIC,
      TTL: "86400",
      Urgency: "high",
      "Content-Encoding": "aes128gcm",
      "Content-Type": "application/octet-stream"
    },
    body
  });
  return res.status;
}

async function getBinds() {
  const hit = await caches.default.match(BIND_URL);
  return hit ? hit.json() : { byRoom: {}, byUser: {} };
}
async function saveBinds(data) {
  await caches.default.put(BIND_URL, new Response(JSON.stringify(data), {
    headers: { "Cache-Control": "max-age=31536000" }
  }));
}
async function getState(env) {
  if (env.DATA) {
    const raw = await env.DATA.get("app");
    if (raw) return JSON.parse(raw);
  }
  const hit = await caches.default.match(STATE_URL);
  return hit ? hit.json() : null;
}
async function putState(env, data) {
  const body = JSON.stringify(data);
  if (env.DATA) await env.DATA.put("app", body);
  await caches.default.put(STATE_URL, new Response(body, {
    headers: { "Cache-Control": "max-age=31536000", "Content-Type": "application/json" }
  }));
}
async function getBuild(env) {
  if (env.DATA) {
    const raw = await env.DATA.get("build");
    if (raw) {
      try { return JSON.parse(raw); } catch { return null; }
    }
  }
  const hit = await caches.default.match(BUILD_URL);
  return hit ? hit.json() : null;
}
async function putBuild(env, data) {
  const body = JSON.stringify(data);
  if (env.DATA) await env.DATA.put("build", body);
  await caches.default.put(BUILD_URL, new Response(body, {
    headers: { "Cache-Control": "max-age=31536000", "Content-Type": "application/json" }
  }));
}
async function getSubs(env) {
  if (env.DATA) {
    const raw = await env.DATA.get("pushSubs");
    if (raw) {
      try { return JSON.parse(raw) || []; } catch { return []; }
    }
  }
  const hit = await caches.default.match(PUSH_URL);
  return hit ? hit.json() : [];
}
async function saveSubs(env, list) {
  const body = JSON.stringify(list || []);
  if (env.DATA) await env.DATA.put("pushSubs", body);
  await caches.default.put(PUSH_URL, new Response(body, {
    headers: { "Cache-Control": "max-age=31536000", "Content-Type": "application/json" }
  }));
}
async function lineToken() {
  const r = await fetch("https://api.line.me/oauth2/v2.1/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "grant_type=client_credentials&client_id=" + CID + "&client_secret=" + SEC
  });
  const j = await r.json();
  return j.access_token;
}
async function reply(replyToken, text) {
  const token = await lineToken();
  await fetch("https://api.line.me/v2/bot/message/reply", {
    method: "POST",
    headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
    body: JSON.stringify({ replyToken, messages: [{ type: "text", text }] })
  });
}
async function linePush(userId, text) {
  if (!userId || !text) return;
  const token = await lineToken();
  await fetch("https://api.line.me/v2/bot/message/push", {
    method: "POST",
    headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
    body: JSON.stringify({ to: userId, messages: [{ type: "text", text: String(text).slice(0, 900) }] })
  });
}
function matchSub(sub, target) {
  const t = String(target || "all");
  const role = String((sub && sub.role) || "");
  const room = String((sub && sub.roomNo) || "");
  if (!t || t === "all") return true;
  if (t === "admin") return role === "admin";
  if (t === "tenants") return role === "tenant";
  return room === t || String((sub && sub.tenantId) || "") === t;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") return cors("", 204);

    if (url.pathname === "/api/state") {
      if (!keyOk(request)) return cors({ error: "key" }, 403);
      if (request.method === "GET") return cors((await getState(env)) || {});
      if (request.method === "PUT") {
        try {
          const data = await request.json();
          await putState(env, data);
          return cors({ ok: true });
        } catch (e) {
          return cors({ error: String((e && e.message) || e) }, 500);
        }
      }
    }

    if (url.pathname === "/api/build") {
      if (!keyOk(request)) return cors({ error: "key" }, 403);
      if (request.method === "GET") return cors((await getBuild(env)) || {});
      if (request.method === "PUT") {
        try {
          const data = await request.json();
          const cur = (await getBuild(env)) || {};
          const nv = Number(data && data.fileVer) || 0;
          const ov = Number(cur.fileVer) || 0;
          if (nv >= ov) {
            await putBuild(env, {
              fileVer: String((data && data.fileVer) || ""),
              stamp: (data && data.stamp) || "",
              edit: (data && data.edit) || 0,
              at: Date.now()
            });
          }
          return cors({ ok: true });
        } catch (e) {
          return cors({ error: String((e && e.message) || e) }, 500);
        }
      }
    }

    if (url.pathname === "/binds" && request.method === "GET") {
      const data = await getBinds();
      return cors(Object.assign({}, data, { workerVer: "0235" }));
    }

    if (url.pathname === "/unbind" && request.method === "POST") {
      if (!keyOk(request)) return cors({ error: "key" }, 403);
      let body = {};
      try { body = await request.json(); } catch (e) {}
      const room = String(body.room || body.roomNo || "").trim();
      const data = await getBinds();
      if (room && data.byRoom && data.byRoom[room]) {
        const uid = data.byRoom[room].userId || data.byRoom[room];
        delete data.byRoom[room];
        if (uid && data.byUser) delete data.byUser[uid];
        await saveBinds(data);
      }
      return cors({ ok: true });
    }

    if (url.pathname === "/api/subscribe" && request.method === "POST") {
      if (!keyOk(request)) return cors({ error: "key" }, 403);
      let body = {};
      try { body = await request.json(); } catch (e) {}
      const sub = body.subscription || body;
      const endpoint = sub && sub.endpoint;
      if (!endpoint) return cors({ error: "subscription" }, 400);
      const list = (await getSubs(env)).filter(x => x && x.endpoint && x.endpoint !== endpoint);
      list.push({
        endpoint,
        keys: sub.keys || {},
        role: String(body.role || ""),
        roomNo: String(body.roomNo || ""),
        tenantId: String(body.tenantId || ""),
        at: Date.now()
      });
      await saveSubs(env, list.slice(-80));
      return cors({ ok: true, n: list.length });
    }

    if (url.pathname === "/api/push" && request.method === "POST") {
      if (!keyOk(request)) return cors({ error: "key" }, 403);
      let body = {};
      try { body = await request.json(); } catch (e) {}
      const target = String(body.target || "all");
      const title = String(body.title || "統潔＆信潔開發");
      const text = String(body.body || "");
      const payload = {
        title,
        body: text,
        tag: body.tag || ("tongjie-" + title),
        page: body.page || (target === "admin" ? "tenants" : ""),
        subtitle: "統潔開發"
      };
      let sent = 0, fail = 0;
      try {
        const binds = await getBinds();
        if (/^\d{4}$/.test(target) && binds.byRoom && binds.byRoom[target]) {
          const uid = binds.byRoom[target].userId || binds.byRoom[target];
          if (uid) await linePush(uid, title + "\n" + text);
        }
      } catch (e) {}
      try {
        const list = await getSubs(env);
        const signKey = await vapidSignKey();
        const keep = [];
        for (const sub of list) {
          if (!sub || !sub.endpoint) continue;
          if (!matchSub(sub, target)) { keep.push(sub); continue; }
          try {
            const st = await sendWebPush(sub, payload, signKey);
            if (st === 404 || st === 410) { fail += 1; continue; }
            if (st >= 200 && st < 300) sent += 1;
            else fail += 1;
            keep.push(sub);
          } catch (e) {
            fail += 1;
            keep.push(sub);
          }
        }
        if (keep.length !== list.length) await saveSubs(env, keep);
      } catch (e) {}
      return cors({ ok: true, sent, fail });
    }

    if (request.method !== "POST") {
      return new Response("統潔開發 LINE Webhook 已啟動", { status: 200 });
    }
    if (url.pathname !== "/" && url.pathname !== "/webhook") {
      return cors({ ok: true });
    }

    let body = {};
    try { body = await request.json(); } catch (e) {}
    const data = await getBinds();
    if (!data.byRoom) data.byRoom = {};
    if (!data.byUser) data.byUser = {};
    if (!data.payProofs) data.payProofs = {};
    if (!data.payUsers) data.payUsers = {};
    if (!data.pendingPayImages) data.pendingPayImages = {};
    let dirty = false;
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
        data.byUser[userId] = { room: room, name: name };
        data.byRoom[room] = { userId: userId, name: name };
        dirty = true;
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
    return new Response("OK", { status: 200 });
  }
};
