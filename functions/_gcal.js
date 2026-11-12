function roomAddress(no) {
  const s = String(no || "").replace(/\D/g, "");
  if (s.length < 4) return "高雄市鳳山區文龍東路";
  return "高雄市鳳山區文龍東路" + s.slice(0, 2) + "號" + s.charAt(2) + "樓-" + s.charAt(3) + "室";
}

function taipeiMs(year, month, day, hour, minute) {
  return Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hour) - 8, Number(minute), 0);
}

export function gcalPage(room, year, month, day, hour, minute) {
  const begin = taipeiMs(year, month, day, hour, minute);
  const end = begin + 3600000;
  const title = room + " 簽約";
  const place = roomAddress(room);
  const web = new URL("https://calendar.google.com/calendar/render");
  web.searchParams.set("action", "TEMPLATE");
  web.searchParams.set("text", title);
  web.searchParams.set("dates", year + month + day + "T" + hour + minute + "00/" + year + month + day + "T" + String(Math.min(Number(hour) + 1, 23)).padStart(2, "0") + minute + "00");
  web.searchParams.set("ctz", "Asia/Taipei");
  web.searchParams.set("location", place);
  web.searchParams.set("details", "統潔簽約");
  const intent = "intent:#Intent"
    + ";action=android.intent.action.INSERT"
    + ";type=vnd.android.cursor.item/event"
    + ";package=com.google.android.calendar"
    + ";S.title=" + encodeURIComponent(title)
    + ";S.eventLocation=" + encodeURIComponent(place)
    + ";S.description=" + encodeURIComponent("統潔簽約")
    + ";l.beginTime=" + begin
    + ";l.endTime=" + end
    + ";end";
  const webUrl = web.toString();
  const chrome = "intent://calendar.google.com" + web.pathname + web.search + "#Intent;scheme=https;package=com.android.chrome;end";
  const html = "<!doctype html><html><head><meta charset=\"utf-8\"><title>加入GOOGLE日歷</title><script>"
    + "var app=" + JSON.stringify(intent) + ";var chrome=" + JSON.stringify(chrome) + ";var web=" + JSON.stringify(webUrl) + ";"
    + "if(/Android/i.test(navigator.userAgent)){location.href=app;setTimeout(function(){if(document.visibilityState!=='hidden')location.href=chrome;},350);}"
    + "else location.replace(web);"
    + "</script></head><body></body></html>";
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}
