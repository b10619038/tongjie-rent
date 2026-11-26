import { cors, getBinds, keyOk, publicBinds } from "./_pay.js";

export async function onRequest(context) {
  const request = context.request;
  if (request.method === "OPTIONS") return cors("", 204);
  if (request.method !== "GET") return cors({ ok: true });
  if (!keyOk(request)) return cors({ error: "key" }, 403);
  const data = await getBinds();
  return cors(Object.assign(publicBinds(data), { workerVer: "0238" }));
}
