// Network-level location of the caller (from Cloudflare's own IP data). City/region is
// only approximate, especially on mobile carriers; the app labels it that way.
export async function onRequestGet({ request }) {
  const cf = request.cf || {};
  const body = {
    country: cf.country || "",
    region: cf.region || "",
    city: cf.city || "",
    isp: cf.asOrganization || "",
    asn: cf.asn || 0
  };
  return new Response(JSON.stringify(body), {
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
  });
}
