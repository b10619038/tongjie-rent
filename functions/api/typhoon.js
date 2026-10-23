export async function onRequest() {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "public, max-age=300",
    "Access-Control-Allow-Origin": "*"
  };
  try {
    const res = await fetch("https://www.dgpa.gov.tw/", {
      headers: { "User-Agent": "tongjie-app", "Accept-Language": "zh-TW" }
    });
    if (!res.ok) return new Response(JSON.stringify({ ok: false, counties: [] }), { status: 200, headers });
    const html = await res.text();
    const re = /headers="city_Name[^"]*"[\s\S]*?<FONT>\s*([^<]+?)\s*<\/FONT>[\s\S]*?<FONT[^>]*>\s*([^<]+?)\s*<\/FONT>/gi;
    const counties = [];
    let m;
    while ((m = re.exec(html))) {
      counties.push({ name: m[1].replace(/\s/g, ""), status: m[2].replace(/\s+/g, "") });
    }
    let date = "";
    const head = html.match(/(\d{2,3})\s*年\s*(\d{1,2})\s*月\s*(\d{1,2})\s*日/);
    if (head) {
      const y = Number(head[1]) + 1911;
      date = y + "-" + String(head[2]).padStart(2, "0") + "-" + String(head[3]).padStart(2, "0");
    }
    return new Response(JSON.stringify({ ok: true, date, counties }), { status: 200, headers });
  } catch {
    return new Response(JSON.stringify({ ok: false, counties: [] }), { status: 200, headers });
  }
}
