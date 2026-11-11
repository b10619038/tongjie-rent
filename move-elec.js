(function () {
  if (window.__moveElec || typeof moveInView !== "function" || typeof studioElecStoreFee !== "function" || typeof render !== "function") return;
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
    return origView();
  };
  function placeElec() {
    if (!document.querySelector(".move-in-page") || document.getElementById("move-elec")) return;
    const cards = document.querySelectorAll(".move-in-page .card, .move-in-page .move-card");
    let card = null;
    cards.forEach(c => {
      if (!card && ((c.textContent || "").indexOf("總結算") >= 0 || (c.textContent || "").indexOf("仲介與第一次付款") >= 0)) card = c;
    });
    if (!card) return;
    const label = document.createElement("label");
    label.className = "field";
    label.style.marginTop = "8px";
    label.innerHTML = '<span>房間電費儲值</span><input id="move-elec" type="number" inputmode="numeric" min="0" step="100" value="' + elecAmount() + '" />';
    const grid = card.querySelector("#move-pay-label") || card.querySelector("#move-pay-grid") || card.querySelector(".sign-slot-grid");
    if (grid) grid.parentNode.insertBefore(label, grid);
    else card.appendChild(label);
  }
  const origCap = captureMoveInDraft;
  captureMoveInDraft = function () {
    origCap();
    const el = document.getElementById("move-elec");
    if (!el) return;
    ensureMoveIn().elecStore = Math.max(0, Math.round(Number(el.value) || 0));
  };
  document.addEventListener("change", function (e) {
    if (!e.target || e.target.id !== "move-elec") return;
    captureMoveInDraft();
    ui.keepScroll = true;
    render();
  }, true);
  const origRender = render;
  render = function () {
    const out = origRender.apply(this, arguments);
    try { placeElec(); } catch (e) {}
    return out;
  };
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
  try { placeElec(); } catch (e) {}
})();
