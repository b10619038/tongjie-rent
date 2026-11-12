(function () {
  if (typeof moveInView !== "function" || String(moveInView).indexOf("data-sign-now") >= 0) return;
  function nowSignStamp() {
    const d = taipeiNow();
    const p = n => String(n).padStart(2, "0");
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()) + "T" + p(d.getHours()) + ":" + p(d.getMinutes());
  }
  window.nowSignStamp = nowSignStamp;
  const src0 = moveInView.toString();
  const swaps = [
    [
      'if (d.signAppointAt && !slotIsOpen(d.signAppointAt)) d.signAppointAt = "";',
      'if (d.signNow) d.signAppointAt = nowSignStamp(); else if (d.signAppointAt && !slotIsOpen(d.signAppointAt)) d.signAppointAt = "";'
    ],
    [
      "let day = ymdOf(d.signAppointAt);",
      "let day = d.signNow ? todayYmd() : ymdOf(d.signAppointAt);"
    ],
    [
      "if (r && !daySlots.length) {",
      "if (r && !d.signNow && !daySlots.length) {"
    ],
    [
      'if (r && (!d.signAppointAt || ymdOf(d.signAppointAt) !== day) && daySlots[0]) d.signAppointAt = daySlots[0];',
      'if (r && !d.signNow && (!d.signAppointAt || ymdOf(d.signAppointAt) !== day) && daySlots[0]) d.signAppointAt = daySlots[0];'
    ],
    [
      "const slots = r ? nextSignSlots(8, d.signAppointAt, win.min, ymdOf(d.signAppointAt) || day) : [];",
      'const slots = r ? nextSignSlots(8, d.signNow ? "" : d.signAppointAt, win.min, d.signNow ? day : (ymdOf(d.signAppointAt) || day)) : [];'
    ],
    [
      '<div class="sign-slot-grid sign-slot-scroll">${slots.map(s => `<button type="button" class="sign-slot${d.signAppointAt === s ? " on" : ""}" data-sign-slot="${escapeHtml(s)}">${escapeHtml(signSlotLabel(s, fastSlot === s))}</button>`).join("") || `<span class="small">這天已滿，請換一天</span>`}</div>',
      '<div class="sign-slot-grid sign-slot-scroll"><button type="button" class="sign-slot${d.signNow ? " on" : ""}" data-sign-now="1">現在時刻</button>${slots.map(s => `<button type="button" class="sign-slot${!d.signNow && d.signAppointAt === s ? " on" : ""}" data-sign-slot="${escapeHtml(s)}">${escapeHtml(signSlotLabel(s, fastSlot === s))}</button>`).join("")}</div>'
    ],
    [
      '${d.signAppointAt ? `<p class="sign-picked">已選　${formatDateTime12(String(d.signAppointAt).replace("T", " "))}</p>` : `<p class="small" style="margin-top:8px">請選日期與時段</p>`}',
      '${d.signNow ? `<p class="sign-picked">已選　現在時刻　${formatDateTime12(String(d.signAppointAt).replace("T", " "))}</p>` : (d.signAppointAt ? `<p class="sign-picked">已選　${formatDateTime12(String(d.signAppointAt).replace("T", " "))}</p>` : `<p class="small" style="margin-top:8px">請選日期與時段</p>`)}'
    ]
  ];
  let src = src0;
  for (let i = 0; i < swaps.length; i++) {
    if (src.indexOf(swaps[i][0]) < 0) return;
    src = src.replace(swaps[i][0], swaps[i][1]);
  }
  src = src.replace(/^function moveInView/, "function");
  moveInView = eval("(" + src + ")");
  const origRoom = applyMoveRoom;
  applyMoveRoom = function (id) {
    if (ui.moveIn) ui.moveIn.signNow = false;
    return origRoom(id);
  };
  document.addEventListener("click", function (e) {
    const t = e.target && e.target.closest ? e.target.closest("[data-sign-now],[data-sign-slot],[data-sign-cal-day]") : null;
    if (!t || !document.querySelector(".move-in-page")) return;
    if (t.hasAttribute("data-sign-now")) {
      e.preventDefault();
      e.stopPropagation();
      const d = ensureMoveIn();
      const prevAt = d.signAppointAt;
      d.signNow = true;
      d.signAppointAt = nowSignStamp();
      if (typeof queueSignAnim === "function") queueSignAnim(prevAt, d.signAppointAt, true);
      const ymd = ymdOf(d.signAppointAt);
      ui.signCalYear = Number(ymd.slice(0, 4));
      ui.signCalMonth = Number(ymd.slice(5, 7));
      ui.keepScroll = true;
      render();
      return;
    }
    if (ui.moveIn) ui.moveIn.signNow = false;
  }, true);
})();
