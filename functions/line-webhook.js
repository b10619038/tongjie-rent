import { cors, handleLineEvents, kickRecover } from "./_pay.js";

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
  if (context.waitUntil) context.waitUntil(kickRecover());
  // Image events may be read by OCR (a few seconds): answer LINE right away and finish in the
  // background; the reply token stays valid well past that.
  let hasImage = false;
  try { hasImage = /"type"\s*:\s*"image"/.test(await request.clone().text()); } catch (e) {}
  if (hasImage && context.waitUntil) {
    context.waitUntil(handleLineEvents(request, context.env).catch(() => {}));
    return new Response("OK", { status: 200 });
  }
  return handleLineEvents(request, context.env);
}
