import { cors, getBinds, keyOk, publicBinds, recoverLineBinds } from "./_pay.js";

export async function onRequest(context) {
  const request = context.request;
  if (request.method === "OPTIONS") return cors("", 204);
  if (request.method === "POST") {
    if (!keyOk(request)) return cors({ error: "key" }, 403);
    try {
      const out = await recoverLineBinds();
      return cors(Object.assign({ workerVer: "0239" }, out));
    } catch (e) {
      return cors({ ok: false, error: String((e && e.message) || e) }, 500);
    }
  }
  if (request.method !== "GET") return cors({ ok: true });
  if (!keyOk(request)) return cors({ error: "key" }, 403);
  const data = await getBinds();
  return cors(Object.assign(publicBinds(data), { workerVer: "0239" }));
}
