import { cors, syncLineFaces } from "./_pay.js";

export async function onRequest(context) {
  const request = context.request;
  if (request.method === "OPTIONS") return cors("", 204);
  if (request.method !== "POST") return cors({ ok: true });
  try {
    const out = await syncLineFaces();
    return cors({ ok: true, more: !!out.more, n: Object.keys(out.faces || {}).length, faces: out.faces || {} });
  } catch (e) {
    return cors({ ok: false, error: String((e && e.message) || e) }, 500);
  }
}
