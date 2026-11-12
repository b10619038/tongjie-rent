import { cors } from "./_pay.js";

const PROMPT = "這是台灣國民身分證正面或反面。只輸出 JSON，不要其他文字。看不清就留空，不要猜。{\"name\":\"\",\"idNo\":\"\",\"birthday\":\"YYYY-MM-DD\",\"address\":\"\"} name 只填中文姓名。idNo 是統一編號，一個大寫英文加 9 碼。birthday 是出生日期不是發證日期，民國年要加 1911。address 是住址。";
const MODELS = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-2.0-flash-lite"];

export async function onRequest(context) {
  const request = context.request;
  if (request.method === "OPTIONS") return cors("", 204);
  if (request.method !== "POST") return cors({ ok: false, error: "POST" }, 405);
  let body = {};
  try { body = await request.json(); } catch {}
  const visKey = String((context.env && (context.env.GEMINI_API_KEY || context.env.GOOGLE_VISION_KEY)) || body.key || "").trim();
  const image = String(body.image || "").replace(/^data:image\/[^;]+;base64,/, "");
  if (!visKey) return cors({ ok: false, error: "nokey" }, 400);
  if (!image) return cors({ ok: false, error: "noimage" }, 400);
  if (image.length > 8000000) return cors({ ok: false, error: "too-big" }, 413);
  let last = "unread";
  for (let i = 0; i < MODELS.length; i++) {
    try {
      const g = await fetch("https://generativelanguage.googleapis.com/v1beta/models/" + encodeURIComponent(MODELS[i]) + ":generateContent?key=" + encodeURIComponent(visKey), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ inlineData: { mimeType: "image/jpeg", data: image } }, { text: PROMPT }] }],
          generationConfig: { temperature: 0 }
        })
      });
      const data = await g.json().catch(() => null);
      if (!data || data.error) {
        last = (data && data.error && data.error.message) || "gemini";
        continue;
      }
      const text = ((((data.candidates || [])[0] || {}).content || {}).parts || []).map(p => p && p.text).filter(Boolean).join("\n");
      const m = String(text || "").match(/\{[\s\S]*\}/);
      if (!m) continue;
      const row = JSON.parse(m[0]);
      if (row && (row.name || row.idNo || row.birthday || row.address)) {
        return cors({ ok: true, name: row.name || "", idNo: row.idNo || "", birthday: row.birthday || "", address: row.address || "" });
      }
    } catch {}
  }
  return cors({ ok: false, error: String(last || "unread").slice(0, 180) }, 422);
}
