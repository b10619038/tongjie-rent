import { cors, handleLineEvents } from "./_pay.js";

const CHAT_LOG = "https://tongjie-line.b10619038.workers.dev/api/linechat/in";
const CHAT_KEY = "tj-82934388";

export async function onRequest(context) {
  const request = context.request;
  if (request.method === "OPTIONS") return cors("", 204);
  if (request.method === "GET") return new Response("統潔開發 LINE Webhook 已啟動", { status: 200 });
  if (request.method !== "POST") return cors({ ok: true });
  // Copy tenant messages into the owner's private in-app chat log.
  // The worker verifies the LINE signature; failures never affect auto-replies.
  try {
    const raw = await request.clone().text();
    const sig = request.headers.get("x-line-signature") || "";
    const job = fetch(CHAT_LOG, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Tongjie-Key": CHAT_KEY },
      body: JSON.stringify({ raw, sig })
    }).catch(() => {});
    if (context.waitUntil) context.waitUntil(job);
  } catch (e) {}
  return handleLineEvents(request);
}
