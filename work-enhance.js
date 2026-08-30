function formatAiMemo(m) {
  const time = m.time ? " " + m.time : "";
  if (m.intervalMonths && m.intervalMonths > 1) {
    return "每" + m.intervalMonths + "個月約" + Number(m.monthDay || 11) + "日" + time + "　" + m.text;
  }
  if (m.monthDay) return (m.flexDays ? "約每月" : "每月") + Number(m.monthDay) + "日" + time + "　" + m.text;
  if (m.date) {
    const p = String(m.date).slice(5).split("-");
    return (p[0] ? Number(p[0]) + "/" + Number(p[1]) : m.date) + time + "　" + m.text;
  }
  if (m.weekday != null) return "每週" + WEEKDAY_ZH[m.weekday] + time + "　" + m.text;
  return m.text;
}
function formatWorkMemo(m) {
  const time = m.time ? " " + m.time : "";
  const mo = new Date().getMonth() + 1;
  const fromYmd = d => {
    const s = String(d || "");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return "";
    return Number(s.slice(5, 7)) + "月" + Number(s.slice(8, 10)) + "日";
  };
  if (m.intervalMonths && m.intervalMonths > 1) {
    return (fromYmd(nextCycleDate(m)) || ("約" + Number(m.monthDay || 11) + "日")) + time + "　" + m.text;
  }
  if (m.monthDay) return (m.flexDays ? "約" : "") + mo + "月" + Number(m.monthDay) + "日" + time + "　" + m.text;
  if (m.date) return (fromYmd(m.date) || m.date) + time + "　" + m.text;
  if (m.weekday != null) return (fromYmd(m.date) || ("週" + WEEKDAY_ZH[m.weekday])) + time + "　" + m.text;
  return m.text;
}
function workOccurYmd(m) {
  if (m && m.monthDay && !(Number(m.intervalMonths) > 1)) {
    const n = new Date();
    const last = new Date(n.getFullYear(), n.getMonth() + 1, 0).getDate();
    const dd = Math.min(Number(m.monthDay) || 1, last);
    return ymNow() + "-" + String(dd).padStart(2, "0");
  }
  return nextCycleDate(m) || (m && m.date) || "";
}
function memoOccurKey(m) {
  if (m && m.monthDay && !(Number(m.intervalMonths) > 1)) return ymNow();
  const d = nextCycleDate(m);
  return d ? d.slice(0, 7) : ymNow();
}
function groupUpcomingMemos() {
  const today = ymdParts(new Date());
  const ym = today.slice(0, 7);
  const soonDt = new Date();
  soonDt.setDate(soonDt.getDate() + 3);
  const soonYmd = ymdParts(soonDt);
  const overdue = [], soon = [], later = [];
  upcomingMemos().forEach(m => {
    const d = workOccurYmd(m);
    if (d && d.slice(0, 7) > ym) return;
    if (d && d < today) overdue.push(m);
    else if (!d || d <= soonYmd) soon.push(m);
    else later.push(m);
  });
  return { overdue, soon, later, all: overdue.concat(soon, later) };
}
(function () {
  function wrapWork() {
    const inner = document.querySelector("#work-card .tenant-slim-inner");
    if (!inner || inner.querySelector(".work-scroll")) return;
    const kids = [...inner.childNodes];
    const hint = inner.querySelector(":scope > p.small");
    const scroll = document.createElement("div");
    scroll.className = "work-scroll";
    const scroller = document.createElement("div");
    scroller.className = "work-scroller";
    kids.forEach(n => {
      if (hint && n === hint) return;
      scroller.appendChild(n);
    });
    if (hint) hint.textContent = "點一筆工作可加到日曆或完成。長字可左右滑查看。";
    inner.appendChild(scroll);
    scroll.appendChild(scroller);
  }
  function boot() {
    wrapWork();
    const root = document.getElementById("app") || document.body;
    const mo = new MutationObserver(() => wrapWork());
    mo.observe(root, { childList: true, subtree: true });
    try {
      if (typeof render === "function" && typeof ui !== "undefined") {
        ui.keepScroll = true;
        render();
      }
    } catch (e) {}
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
