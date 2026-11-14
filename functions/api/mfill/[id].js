const KEY = "tj-82934388";

function json(data, status) {
  return new Response(typeof data === "string" ? data : JSON.stringify(data), {
    status: status || 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, X-Tongjie-Key",
      "Access-Control-Allow-Methods": "GET,PUT,OPTIONS"
    }
  });
}
function slot(id) {
  return "https://tongjie-app.pages.dev/__mfill/" + id;
}

function newerDoc(a, b) {
  if (!a || !a.fields) return b && b.fields ? b : null;
  if (!b || !b.fields) return a;
  const ar = Number(a.reset) || 0;
  const br = Number(b.reset) || 0;
  if (ar !== br) return ar > br ? a : b;
  return (Number(a.at) || 0) >= (Number(b.at) || 0) ? a : b;
}
export async function onRequest(context) {
  const { request, env } = context;
  if (request.method === "OPTIONS") return json("", 204);
  if (request.headers.get("X-Tongjie-Key") !== KEY) return json({ error: "key" }, 403);
  const id = String((context.params && context.params.id) || "").replace(/[^a-zA-Z0-9._-]/g, "").slice(0, 40);
  if (!id) return json({ error: "file" }, 400);
  const kv = "mfill:" + id;
  const cache = caches.default;
  const keyUrl = slot(id);
  if (request.method === "GET") {
    let kvDoc = null;
    let cacheDoc = null;
    if (env && env.DATA) {
      try {
        const raw = await env.DATA.get(kv);
        if (raw) kvDoc = JSON.parse(raw);
      } catch {}
    }
    const hit = await cache.match(keyUrl);
    if (hit) { try { cacheDoc = await hit.json(); } catch {} }
    const doc = newerDoc(kvDoc, cacheDoc);
    if (!doc) return json({ error: "missing" }, 404);
    if (doc !== kvDoc && env && env.DATA) {
      try { await env.DATA.put(kv, JSON.stringify(doc), { expirationTtl: 60 * 60 * 24 * 21 }); } catch {}
    }
    return json(doc);
  }
  if (request.method === "PUT") {
    const text = await request.text();
    if (!text) return json({ error: "empty" }, 400);
    if (text.length > 1500000) return json({ error: "too-big" }, 413);
    let incoming = null;
    try { incoming = JSON.parse(text); } catch { return json({ error: "json" }, 400); }
    let prev = null;
    if (env && env.DATA) {
      try {
        const raw = await env.DATA.get(kv);
        if (raw) prev = JSON.parse(raw);
      } catch {}
    }
    if (!prev) {
      const hit = await cache.match(keyUrl);
      if (hit) { try { prev = await hit.json(); } catch {} }
    }
    const prevReset = Number(prev && prev.reset) || 0;
    const nextReset = Number(incoming && incoming.reset) || 0;
    if (prevReset && nextReset < prevReset) return json({ error: "reset", reset: prevReset }, 409);
    if (env && env.DATA) {
      try { await env.DATA.put(kv, text, { expirationTtl: 60 * 60 * 24 * 21 }); } catch {}
    }
    await cache.put(keyUrl, new Response(text, {
      headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=1814400" }
    }));
    return json({ ok: true, saved: text.length });
  }
  return json({ error: "method" }, 405);
}
