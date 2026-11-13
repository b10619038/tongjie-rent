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

export async function onRequest(context) {
  const { request, env } = context;
  if (request.method === "OPTIONS") return json("", 204);
  if (request.headers.get("X-Tongjie-Key") !== KEY) return json({ error: "key" }, 403);
  const id = String((context.params && context.params.id) || "").replace(/[^a-zA-Z0-9._-]/g, "").slice(0, 40);
  if (!id || !env || !env.DATA) return json({ error: "file" }, 400);
  const kv = "mfill:" + id;
  if (request.method === "GET") {
    const raw = await env.DATA.get(kv);
    if (!raw) return json({ error: "missing" }, 404);
    try { return json(JSON.parse(raw)); } catch { return json({ error: "bad" }, 500); }
  }
  if (request.method === "PUT") {
    const text = await request.text();
    if (!text) return json({ error: "empty" }, 400);
    if (text.length > 1500000) return json({ error: "too-big" }, 413);
    try { JSON.parse(text); } catch { return json({ error: "json" }, 400); }
    await env.DATA.put(kv, text, { expirationTtl: 60 * 60 * 24 * 21 });
    return json({ ok: true });
  }
  return json({ error: "method" }, 405);
}
