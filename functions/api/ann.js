const KEY = "ann-live";

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}
function allowed(request) {
  return request.headers.get("X-Tongjie-Key") === "tj-82934388";
}
async function readPack(env) {
  if (env && env.DATA) {
    try {
      const raw = await env.DATA.get(KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
  }
  return { at: 0, items: [], gone: [] };
}

export async function onRequest(context) {
  const request = context.request;
  const env = context.env;
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
  if (!allowed(request)) return json({ error: "key" }, 403);
  if (request.method === "GET") return json(await readPack(env));
  if (request.method !== "PUT" && request.method !== "POST") return json({ error: "method" }, 405);
  let body = {};
  try { body = await request.json(); } catch {}
  const pack = {
    at: Date.now(),
    items: Array.isArray(body.items) ? body.items : [],
    gone: Array.isArray(body.gone) ? body.gone : []
  };
  if (env && env.DATA) {
    try { await env.DATA.put(KEY, JSON.stringify(pack)); } catch {}
  }
  return json({ ok: true, at: pack.at });
}
