import { cors, getBinds } from "./_pay.js";

export async function onRequest(context) {
  const request = context.request;
  if (request.method === "OPTIONS") return cors("", 204);
  if (request.method !== "GET") return cors({ ok: true });
  const data = await getBinds();
  return cors(Object.assign({}, data, { workerVer: "0236" }));
}
