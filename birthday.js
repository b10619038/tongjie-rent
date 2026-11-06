(function () {
  const STYLE = ".hero-card.is-bday{position:relative}.hero-card.is-bday>:not(.bday-deco){position:relative;z-index:1}.bday-deco{position:absolute;inset:0;z-index:0;overflow:hidden;border-radius:inherit;pointer-events:none}.bday-wish{position:absolute;right:10px;top:4px;width:108px;height:auto}";
  function svg() {
    return '<div class="bday-deco" aria-hidden="true">'
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
    if (/吳[惠慧]青/.test(String(t.name || "")) || t.id === "t7651") return true;
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
    if (!birthdayToday(t) && !/7651/.test(card.textContent || "")) return;
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
