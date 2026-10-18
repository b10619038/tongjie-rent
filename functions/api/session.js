const STORE = "https://tongjie-app.pages.dev/__keep/";

function json(data, extra, status) {
  const headers = Object.assign({
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  }, extra || {});
  return new Response(JSON.stringify(data), { status: status || 200, headers });
}
function readCookie(request, name) {
  const raw = request.headers.get("Cookie") || "";
  const m = raw.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return m ? decodeURIComponent(m[1]) : "";
}
function setCookie(value, maxAge) {
  return "tj_sid=" + value + "; Path=/; Max-Age=" + maxAge + "; HttpOnly; Secure; SameSite=Lax";
}
function newToken() {
  const a = new Uint8Array(24);
  crypto.getRandomValues(a);
  return Array.from(a).map(b => b.toString(16).padStart(2, "0")).join("");
}
async function loadSnap(env, id) {
  if (!id || !/^[a-f0-9]{48}$/.test(id)) return null;
  if (env && env.DATA) {
    try {
      const raw = await env.DATA.get("keep:" + id);
      if (raw) return JSON.parse(raw);
    } catch {}
  }
  try {
    const hit = await caches.default.match(STORE + id);
    if (hit) return hit.json();
  } catch {}
  return null;
}
async function saveSnap(env, id, snap) {
  const body = JSON.stringify(snap);
  if (env && env.DATA) {
    try { await env.DATA.put("keep:" + id, body, { expirationTtl: 60 * 60 * 24 * 400 }); } catch {}
  }
  try {
    await caches.default.put(STORE + id, new Response(body, {
      headers: { "Cache-Control": "max-age=31536000", "Content-Type": "application/json" }
    }));
  } catch {}
}
async function dropSnap(env, id) {
  if (!id) return;
  if (env && env.DATA) {
    try { await env.DATA.delete("keep:" + id); } catch {}
  }
  try { await caches.default.delete(STORE + id); } catch {}
}

export async function onRequest(context) {
  const request = context.request;
  const env = context.env;
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
  const sid = readCookie(request, "tj_sid");
  if (request.method === "GET") {
    const snap = await loadSnap(env, sid);
    if (!snap || snap.role !== "tenant" || !snap.tenantId) return json({ ok: false });
    return json({ ok: true, snap });
  }
  if (request.method === "DELETE") {
    await dropSnap(env, sid);
    return json({ ok: true }, { "Set-Cookie": setCookie("", 0) });
  }
  if (request.method !== "POST") return json({ error: "method" }, {}, 405);
  let body = {};
  try { body = await request.json(); } catch {}
  if (!body || body.role !== "tenant" || !body.tenantId) return json({ error: "bad" }, {}, 400);
  const id = /^[a-f0-9]{48}$/.test(sid) ? sid : newToken();
  const snap = {
    role: "tenant",
    tenantId: String(body.tenantId),
    roomId: String(body.roomId || ""),
    roomNo: String(body.roomNo || ""),
    device: String(body.device || ""),
    at: Date.now()
  };
  await saveSnap(env, id, snap);
  return json({ ok: true }, { "Set-Cookie": setCookie(id, 31536000) });
}
