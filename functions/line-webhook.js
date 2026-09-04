import { cors, handleLineEvents } from "./_pay.js";

export async function onRequest(context) {
  const request = context.request;
  if (request.method === "OPTIONS") return cors("", 204);
  if (request.method === "GET") return new Response("統潔開發 LINE Webhook 已啟動", { status: 200 });
  if (request.method !== "POST") return cors({ ok: true });
  return handleLineEvents(request);
}
