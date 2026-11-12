import { gcalPage } from "./_gcal.js";

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const room = String(url.searchParams.get("r") || "").replace(/\D/g, "");
  const at = String(url.searchParams.get("t") || "").trim();
  const m = at.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})$/);
  if (!m || room.length < 4) {
    return new Response("缺少簽約時間", { status: 400, headers: { "content-type": "text/plain; charset=utf-8" } });
  }
  return gcalPage(room, m[1], m[2], m[3], m[4], m[5]);
}
