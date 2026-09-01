async function putState(env, data) {
  const body = JSON.stringify(data);
  if (env.DATA) await env.DATA.put("app", body);
  try {
    await caches.default.put(STATE_URL, new Response(body, {
      headers: { "Cache-Control": "max-age=31536000", "Content-Type": "application/json" }
    }));
  } catch (e) {}
}

// PUT /api/state 片段：用 try/catch，失敗回 JSON 不要讓 Worker 整支炸掉
// if (request.method === "PUT") {
//   try {
//     const data = await request.json();
//     await putState(env, data);
//     return cors({ ok: true });
//   } catch (e) {
//     return cors({ error: String((e && e.message) || e) }, 500);
//   }
// }
