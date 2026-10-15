(function () {
  if (typeof earlyApplyOverlayHtml !== "function") return;
  if (String(earlyApplyOverlayHtml).indexOf("early-reason") >= 0) return;
  function reasonNow() {
    const el = document.getElementById("early-reason");
    return String((el && el.value) || (typeof ui !== "undefined" && ui.earlyReason) || "").trim();
  }
  const origOverlay = earlyApplyOverlayHtml;
  earlyApplyOverlayHtml = function () {
    const html = origOverlay.apply(this, arguments);
    if (!html || html.indexOf('id="early-reason"') >= 0) return html;
    const val = typeof escapeHtml === "function" ? escapeHtml((ui && ui.earlyReason) || "") : "";
    const field = '<label class="field" style="margin-top:12px"><span>中途退租理由</span><textarea id="early-reason" rows="3" maxlength="200" placeholder="請寫為什麼要提前退租">' + val + '</textarea></label><p class="small">必填。後台會看到這段理由。</p>';
    const mark = '<button type="button" class="btn-navy" id="early-send"';
    if (html.indexOf(mark) < 0) return html;
    return html.replace(mark, field + mark);
  };
  const origBind = bindEarlyApply;
  bindEarlyApply = function () {
    origBind.apply(this, arguments);
    const box = document.getElementById("early-reason");
    if (!box) return;
    box.oninput = function () { ui.earlyReason = box.value; };
  };
  const origCard = earlyApplyCardHtml;
  earlyApplyCardHtml = function (t, r) {
    const html = origCard.apply(this, arguments);
    if (!html || html.indexOf("中途退租理由") >= 0) return html;
    const cur = typeof tenantEarlyApply === "function" ? tenantEarlyApply(t) : null;
    if (!cur || !cur.reason) return html;
    const line = "中途退租理由：" + escapeHtml(cur.reason) + "。";
    const mark = "這份終止契約和後台是同一份";
    if (html.indexOf(mark) < 0) return html;
    return html.replace(mark, line + mark);
  };
  const origFlash = flashEarlyNotice;
  flashEarlyNotice = function (ping) {
    if (!ui || ui.role !== "admin") return;
    const p = ping || (typeof state !== "undefined" && state && state.earlyPing);
    if (!p || !p.name) return;
    if (!p.reason && p.id && state && Array.isArray(state.checkouts)) {
      const co = state.checkouts.find(function (c) { return c && c.id === p.id; });
      if (co && co.reason) p.reason = co.reason;
    }
    if (typeof earlyPingAlreadySeen === "function" && earlyPingAlreadySeen(p)) return;
    if (typeof markEarlyPingSeen === "function") markEarlyPingSeen(p);
    const when = p.appointAt && typeof formatDateTime12 === "function" ? formatDateTime12(String(p.appointAt).replace("T", " ")) : "";
    const line = ((p.roomNo || "") + " " + (p.name || "") + " 申請中途退租　終止日 " + ((typeof rocSlash === "function" && rocSlash(p.date)) || "") + "　總退還 " + (typeof money === "function" ? money(p.refund || 0) : "") + (p.elecBalance != null ? "（含電費餘額 " + money(p.elecBalance) + "）" : "") + (when ? "　預約 " + when : "") + (p.reason ? "　理由 " + p.reason : "")).trim();
    try { showOsBanner("中途退租申請", line, "early-" + (p.id || p.roomNo || "")); } catch (e) {}
    try { toast("中途退租申請　" + line); } catch (e) {}
    void origFlash;
  };
  const origForm = typeof checkoutFormHtml === "function" ? checkoutFormHtml : null;
  if (origForm) {
    checkoutFormHtml = function () {
      const html = origForm.apply(this, arguments);
      if (!html || html.indexOf("中途退租理由") >= 0 || html.indexOf("中途退租") < 0) return html;
      const id = ui && ui.checkoutTenantId;
      const t = id && (state.tenants || []).find(function (x) { return x && x.id === id; });
      const co = t && typeof lastCheckout === "function" ? (lastCheckout(t.id) || {}) : {};
      if (!co.reason) return html;
      const block = '<div class="handover-note" style="margin-top:8px"><div class="label">中途退租理由</div><p>' + escapeHtml(co.reason) + "</p></div>";
      const mark = '<div class="small">';
      const at = html.indexOf(mark);
      if (at < 0) return html;
      return html.slice(0, at) + block + html.slice(at);
    };
  }
  const origSubmit = submitTenantEarly;
  submitTenantEarly = function () {
    const reason = reasonNow();
    if (!reason) {
      toast("請填寫中途退租理由");
      const el = document.getElementById("early-reason");
      if (el) el.focus();
      return;
    }
    ui.earlyReason = reason;
    const list = state.checkouts || (state.checkouts = []);
    const origPush = list.push;
    list.push = function (row) {
      if (row && row.kind === "early" && !row.reason) row.reason = reason;
      return origPush.apply(list, arguments);
    };
    const origNotify = pushPhoneNotify;
    pushPhoneNotify = function (title, body, to) {
      if (title === "中途退租申請" && String(body || "").indexOf("理由") < 0) body = String(body || "") + "　理由 " + reason;
      return origNotify.call(this, title, body, to);
    };
    try {
      return origSubmit.apply(this, arguments);
    } finally {
      list.push = origPush;
      pushPhoneNotify = origNotify;
      try {
        const t = typeof me === "function" ? me() : null;
        const cur = t && typeof tenantEarlyApply === "function" ? tenantEarlyApply(t) : null;
        if (cur && cur.kind === "early" && cur.reason !== reason) {
          cur.reason = reason;
          if (state.earlyPing && state.earlyPing.id === cur.id) state.earlyPing.reason = reason;
          try { save(); } catch (e) {}
          try { publishEarlyNow(cur); } catch (e) {}
          try { pushCloud(); } catch (e) {}
          try { render(); } catch (e) {}
        }
      } catch (e) {}
    }
  };
})();
