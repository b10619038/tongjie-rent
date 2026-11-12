import { gcalPage } from "../_gcal.js";

export async function onRequest(context) {
  const code = String((context.params && context.params.code) || "").trim();
  const m = code.match(/^(\d{4})-(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})$/);
  if (!m) return new Response("缺少簽約時間", { status: 400, headers: { "content-type": "text/plain; charset=utf-8" } });
  return gcalPage(m[1], m[2], m[3], m[4], m[5], m[6]);
}
