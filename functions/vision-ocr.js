import { cors } from "./_pay.js";

export async function onRequest(context) {
  const request = context.request;
  if (request.method === "OPTIONS") return cors("", 204);
  if (request.method !== "POST") return cors({ ok: false, error: "POST" }, 405);
  let body = {};
  try { body = await request.json(); } catch {}
  const visKey = String((context.env && context.env.GOOGLE_VISION_KEY) || body.key || "").trim();
  const image = String(body.image || "").replace(/^data:image\/[^;]+;base64,/, "");
  if (!visKey) return cors({ ok: false, error: "nokey" }, 400);
  if (!image) return cors({ ok: false, error: "noimage" }, 400);
  if (image.length > 8000000) return cors({ ok: false, error: "too-big" }, 413);
  try {
    const g = await fetch("https://vision.googleapis.com/v1/images:annotate?key=" + encodeURIComponent(visKey), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requests: [{
          image: { content: image },
          features: [{ type: "DOCUMENT_TEXT_DETECTION" }],
          imageContext: { languageHints: ["zh-Hant", "zh-TW", "en"] }
        }]
      })
    });
    const data = await g.json();
    const resp = data && data.responses && data.responses[0];
    if (resp && resp.error) return cors({ ok: false, error: String(resp.error.message || "vision") }, 400);
    const text = (resp && resp.fullTextAnnotation && resp.fullTextAnnotation.text)
      || (resp && resp.textAnnotations && resp.textAnnotations[0] && resp.textAnnotations[0].description)
      || "";
    return cors({ ok: true, text: String(text || "") });
  } catch {
    return cors({ ok: false, error: "network" }, 502);
  }
}
