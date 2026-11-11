(function () {
  if (window.__moveElec || typeof moveInView !== "function" || typeof studioElecStoreFee !== "function") return;
  window.__moveElec = true;
  function elecAmount() {
    const d = ensureMoveIn();
    if (d.elecStore == null || d.elecStore === "") d.elecStore = 1000;
    return Math.max(0, Math.round(Number(d.elecStore) || 0));
  }
  const origFee = studioElecStoreFee;
  studioElecStoreFee = function (t, r) {
    if (t && t.elecStore != null && t.elecStore !== "") return Math.max(0, Math.round(Number(t.elecStore) || 0));
    if (typeof ui !== "undefined" && ui && ui.page === "move-in" && ui.moveIn && t && !t.id) return elecAmount();
    return origFee(t, r);
  };
  const origView = moveInView;
  moveInView = function () {
    elecAmount();
    let html = origView();
    if (html.indexOf("move-elec") >= 0) return html;
    const field = '<label class="field" style="margin-top:4px"><span>電費儲值</span><input id="move-elec" type="number" inputmode="numeric" min="0" step="100" value="' + elecAmount() + '" /></label><p class="small" style="margin:4px 0 8px">預設 1,000，可改成這次要儲值的金額。年水費仍依人數，一人 1,800。</p>';
    const lead = "租客一樣要登入 App。</p>";
    if (html.indexOf(lead) >= 0) html = html.replace(lead, lead + field);
    return html;
  };
  const origCap = captureMoveInDraft;
  captureMoveInDraft = function () {
    origCap();
    const el = document.getElementById("move-elec");
    if (!el) return;
    const d = ensureMoveIn();
    d.elecStore = Math.max(0, Math.round(Number(el.value) || 0));
  };
  document.addEventListener("change", function (e) {
    if (!e.target || e.target.id !== "move-elec") return;
    captureMoveInDraft();
    ui.keepScroll = true;
    render();
  }, true);
  function stampElec() {
    const d = ensureMoveIn();
    const elec = elecAmount();
    const phone = typeof normalizeMobile === "function" ? normalizeMobile(d.phone || "") : String(d.phone || "");
    const name = typeof normalizePersonName === "function" ? normalizePersonName(d.name || "") : String(d.name || "");
    (state.tenants || []).forEach(t => {
      if (!t || !(t.incoming || t.prospect || t.applyPending)) return;
      const samePhone = phone && (typeof normalizeMobile === "function" ? normalizeMobile(t.phone) : String(t.phone || "")) === phone;
      const sameName = name && typeof nameMatch === "function" && nameMatch(t.name, name);
      if (!samePhone && !sameName) return;
      t.elecStore = elec;
      const note = String(t.note || "");
      const line = "電儲值 " + elec;
      t.note = /電儲值\s*[\d,]+/.test(note) ? note.replace(/電儲值\s*[\d,]+/, line) : ((note ? note + " " : "") + line);
    });
  }
  const origSave = save;
  let stamping = false;
  save = function () {
    if (stamping) stampElec();
    return origSave.apply(this, arguments);
  };
  const origSubmit = submitMoveIn;
  submitMoveIn = function () {
    captureMoveInDraft();
    elecAmount();
    stamping = true;
    try { return origSubmit(); }
    finally { stamping = false; }
  };
})();
