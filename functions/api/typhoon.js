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
    return new Response(JSON.stringify({ ok: true, counties }), { status: 200, headers });
  } catch {
    return new Response(JSON.stringify({ ok: false, counties: [] }), { status: 200, headers });
  }
}
