function roomAddress(no) {
  const s = String(no || "").replace(/\D/g, "");
  if (s.length < 4) return "高雄市鳳山區文龍東路";
  return "高雄市鳳山區文龍東路" + s.slice(0, 2) + "號" + s.charAt(2) + "樓-" + s.charAt(3) + "室";
}

export function gcalPage(room, year, month, day, hour, minute) {
  const start = year + month + day + "T" + hour + minute + "00";
  let next = Number(hour) + 1;
  const end = next >= 24
    ? year + month + day + "T235900"
    : year + month + day + "T" + String(next).padStart(2, "0") + minute + "00";
  const g = new URL("https://calendar.google.com/calendar/render");
  g.searchParams.set("action", "TEMPLATE");
  g.searchParams.set("text", room + " 簽約");
  g.searchParams.set("dates", start + "/" + end);
  g.searchParams.set("ctz", "Asia/Taipei");
  g.searchParams.set("location", roomAddress(room));
  g.searchParams.set("details", "統潔簽約");
  const web = g.toString();
  const intent = "intent://calendar.google.com/calendar/render?" + g.searchParams.toString()
    + "#Intent;scheme=https;package=com.google.android.calendar;S.browser_fallback_url="
    + encodeURIComponent(web) + ";end";
  const html = "<!doctype html><html><head><meta charset=\"utf-8\"><title>加入GOOGLE日歷</title><script>"
    + "var web=" + JSON.stringify(web) + ";var intent=" + JSON.stringify(intent) + ";"
    + "if(/Android/i.test(navigator.userAgent)) location.replace(intent);else location.replace(web);"
    + "</script></head><body></body></html>";
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}
