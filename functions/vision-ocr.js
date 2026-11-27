import { cors, ocrImageFromBase64 } from "./_pay.js";

export async function onRequest(context) {
  const request = context.request;
  if (request.method === "OPTIONS") return cors("", 204);
  if (request.method !== "POST") return cors({ ok: false, error: "POST" }, 405);
  let body = {};
  try { body = await request.json(); } catch {}
  const image = String(body.image || "").replace(/^data:image\/[^;]+;base64,/, "");
  if (!image) return cors({ ok: false, error: "noimage" }, 400);
  if (image.length > 8000000) return cors({ ok: false, error: "too-big" }, 413);
  const env = Object.assign({}, context.env || {});
  if (body.key && !env.GOOGLE_VISION_KEY && !env.GEMINI_API_KEY) env.GOOGLE_VISION_KEY = String(body.key || "").trim();
  try {
    const text = await ocrImageFromBase64(env, image);
    if (text == null) {
      const hasProv = !!(env.GOOGLE_VISION_KEY || env.GEMINI_API_KEY || env.LINE_OCR_KEY || (env.AI && typeof env.AI.run === "function"));
      return cors({ ok: false, error: hasProv ? "unread" : "nokey" }, hasProv ? 502 : 400);
    }
    return cors({ ok: true, text: String(text || "") });
  } catch {
    return cors({ ok: false, error: "network" }, 502);
  }
}
