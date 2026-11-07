import { cors, syncLineFaces } from "./_pay.js";

export async function onRequest(context) {
  const request = context.request;
  if (request.method === "OPTIONS") return cors("", 204);
  if (request.method !== "POST") return cors({ ok: true });
  try {
    let posted = null;
    let postedPay = null;
    try {
      const body = await request.json();
      posted = body && body.byRoom;
      postedPay = body && body.payUsers;
    } catch (e) {}
    const out = await syncLineFaces(null, posted, postedPay);
    return cors({ ok: true, more: !!out.more, n: Object.keys(out.faces || {}).length, faces: out.faces || {} });
  } catch (e) {
    return cors({ ok: false, error: String((e && e.message) || e) }, 500);
  }
}
