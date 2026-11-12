export async function onRequest(context) {
  const url = new URL(context.request.url);
  const room = String(url.searchParams.get("r") || "").trim();
  const at = String(url.searchParams.get("t") || "").trim();
  const place = String(url.searchParams.get("a") || "").trim();
  const names = String(url.searchParams.get("n") || "").trim();
  const m = at.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})$/);
  if (!m) {
    return new Response("缺少簽約時間", { status: 400, headers: { "content-type": "text/plain; charset=utf-8" } });
  }
  const start = m[1] + m[2] + m[3] + "T" + m[4] + m[5] + "00";
  let hour = Number(m[4]) + 1;
  let end = m[1] + m[2] + m[3] + "T" + String(hour).padStart(2, "0") + m[5] + "00";
  if (hour >= 24) end = m[1] + m[2] + m[3] + "T235900";
  const title = (room ? room + " " : "") + "簽約" + (names ? " " + names : "");
  const g = new URL("https://calendar.google.com/calendar/render");
  g.searchParams.set("action", "TEMPLATE");
  g.searchParams.set("text", title);
  g.searchParams.set("dates", start + "/" + end);
  g.searchParams.set("ctz", "Asia/Taipei");
  if (place) g.searchParams.set("location", place);
  g.searchParams.set("details", "統潔簽約");
  return Response.redirect(g.toString(), 302);
}
