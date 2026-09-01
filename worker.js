const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, X-Tongjie-Key",
  "Access-Control-Allow-Methods": "GET,PUT,POST,OPTIONS"
};
const SYNC_KEY = "tj-82934388";

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS });
    }
    const url = new URL(request.url);
    if (url.pathname === "/api/state") {
      const key = request.headers.get("X-Tongjie-Key") || "";
      if (key !== SYNC_KEY) {
        return new Response("forbidden", { status: 403, headers: CORS });
      }
      try {
        if (request.method === "GET") {
          const raw = env.STATE ? await env.STATE.get("app") : null;
          return new Response(raw || "{}", {
            headers: { ...CORS, "Content-Type": "application/json; charset=utf-8" }
          });
        }
        if (request.method === "PUT") {
          const text = await request.text();
          JSON.parse(text);
          if (!env.STATE) throw new Error("KV binding STATE missing");
          await env.STATE.put("app", text);
          return new Response("ok", { headers: CORS });
        }
      } catch (err) {
        return new Response(String((err && err.message) || err), {
          status: 500,
          headers: { ...CORS, "Content-Type": "text/plain; charset=utf-8" }
        });
      }
    }
    return new Response("統潔開發 LINE Webhook 已啟動", {
      headers: { ...CORS, "Content-Type": "text/plain; charset=utf-8" }
    });
  }
};
