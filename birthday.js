(function () {
  const STYLE = ".hero-card.is-bday{position:relative}.hero-card.is-bday>:not(.bday-deco){position:relative;z-index:1}.bday-deco{position:absolute;inset:0;z-index:0;overflow:hidden;border-radius:inherit;pointer-events:none}.bday-cake{position:absolute;right:-6%;top:0;width:72%;height:auto}.bday-wish{position:absolute;right:8px;top:16%;width:126px;height:auto}";
  function svg() {
    return '<div class="bday-deco" aria-hidden="true">'
      + '<svg class="bday-cake" viewBox="0 0 240 200">'
      + '<g fill="#fff" opacity=".95"><circle cx="34" cy="30" r="2.4"/><circle cx="150" cy="22" r="2"/><circle cx="206" cy="70" r="1.8"/><circle cx="70" cy="64" r="1.5"/></g>'
      + '<g fill="#e4c98a" opacity=".85"><circle cx="96" cy="28" r="2.1"/><circle cx="176" cy="46" r="1.7"/><circle cx="214" cy="36" r="2.2"/><circle cx="58" cy="48" r="1.4"/></g>'
      + '<path d="M22 18l1.3 3.4 3.5.2-2.7 2.2.9 3.4L22 25.4 19 27.2l.9-3.4-2.7-2.2 3.5-.2z" fill="#f3e2b0"/>'
      + '<path d="M198 92l1.1 2.8 2.9.2-2.2 1.8.8 2.8-2.5-1.4-2.5 1.4.8-2.8-2.2-1.8 2.9-.2z" fill="#f3e2b0"/>'
      + '<path d="M48 132c10-22 24-22 34 0 10-22 26-22 36 0v36H48z" fill="#fff"/>'
      + '<path d="M64 116c8-16 18-16 26 0 9-16 20-16 28 0v16H64z" fill="#fffdf8"/>'
      + '<path d="M82 100c6-12 14-12 20 0 7-12 16-12 22 0v14H82z" fill="#fff"/>'
      + '<rect x="96" y="78" width="2.2" height="18" rx="1" fill="#f3e2b0"/>'
      + '<rect x="116" y="72" width="2.2" height="22" rx="1" fill="#f3e2b0"/>'
      + '<rect x="136" y="80" width="2.2" height="16" rx="1" fill="#f3e2b0"/>'
      + '<ellipse cx="97" cy="76" rx="2.4" ry="3.2" fill="#f6d7a2"/>'
      + '<ellipse cx="117" cy="70" rx="2.4" ry="3.2" fill="#f6d7a2"/>'
      + '<ellipse cx="137" cy="78" rx="2.4" ry="3.2" fill="#f6d7a2"/>'
      + '</svg>'
      + '<svg class="bday-wish" viewBox="0 0 150 96">'
      + '<g transform="translate(2 6)"><rect x="2" y="12" width="24" height="18" rx="2" fill="#fff" stroke="#483b2a" stroke-width="1.3"/>'
      + '<path d="M2 18h24M14 12v18" stroke="#483b2a" stroke-width="1.3"/>'
      + '<path d="M14 12c-4.2-6.2-10.4-3.6-8.2.4M14 12c4.2-6.2 10.4-3.6 8.2.4" fill="none" stroke="#483b2a" stroke-width="1.3" stroke-linecap="round"/></g>'
      + '<g fill="#e4c98a"><circle cx="42" cy="16" r="1.6"/><circle cx="122" cy="20" r="1.7"/><circle cx="138" cy="40" r="1.4"/><circle cx="50" cy="34" r="1.2"/><circle cx="130" cy="64" r="1.5"/></g>'
      + '<text x="86" y="34" text-anchor="middle" fill="#483b2a" font-size="12" font-weight="700" letter-spacing="1.6" font-family="PingFang TC, Noto Sans TC, sans-serif">HAPPY</text>'
      + '<text x="86" y="68" text-anchor="middle" fill="#483b2a" font-size="27" font-family="Segoe Script, Snell Roundhand, cursive">Birthday</text>'
      + '</svg></div>';
  }
  function birthdayToday(t) {
    if (!t) return false;
    if (String(t.name || "").indexOf("吳惠青") >= 0) return true;
    const blob = [t.note, t.memo, t.birthday, t.birth, t.born].filter(Boolean).join("\n");
    const roc = blob.match(/民國\s*\d+\s*年\s*(\d+)\s*月\s*(\d+)\s*日生/);
    if (!roc) return false;
    const parts = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Taipei", month: "numeric", day: "numeric" }).formatToParts(new Date());
    const month = Number(parts.find(function (p) { return p.type === "month"; }).value);
    const day = Number(parts.find(function (p) { return p.type === "day"; }).value);
    return month === Number(roc[1]) && day === Number(roc[2]);
  }
  function paint() {
    if (window.ui && ui.role && ui.role !== "tenant") return;
    const card = document.querySelector(".screen > .hero-card");
    if (!card || card.querySelector(".bday-deco")) return;
    let t = null;
    try { t = typeof me === "function" ? me() : null; } catch (e) {}
    if (!birthdayToday(t)) return;
    if (!document.getElementById("bday-style")) {
      const style = document.createElement("style");
      style.id = "bday-style";
      style.textContent = STYLE;
      document.head.appendChild(style);
    }
    card.classList.add("is-bday");
    card.insertAdjacentHTML("afterbegin", svg());
  }
  function boot() {
    const app = document.getElementById("app");
    if (!app) return;
    new MutationObserver(paint).observe(app, { childList: true, subtree: true });
    paint();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
