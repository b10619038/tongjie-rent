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
    if (env && env.DATA) {
      try {
        const raw = await env.DATA.get(kv);
        if (raw) return json(JSON.parse(raw));
      } catch {}
    }
    const hit = await cache.match(keyUrl);
    if (!hit) return json({ error: "missing" }, 404);
    try { return json(await hit.json()); } catch { return json({ error: "bad" }, 500); }
  }
  if (request.method === "PUT") {
    const text = await request.text();
    if (!text) return json({ error: "empty" }, 400);
    if (text.length > 1500000) return json({ error: "too-big" }, 413);
    try { JSON.parse(text); } catch { return json({ error: "json" }, 400); }
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
