(function () {
  const BOX = "tj-repair-order-v1";
  function readBox() {
    try { return JSON.parse(localStorage.getItem(BOX) || "{}") || {}; } catch (e) { return {}; }
  }
  function writeBox(box) {
    try { localStorage.setItem(BOX, JSON.stringify(box || {})); } catch (e) {}
  }
  function kind() {
    try {
      if (typeof isDeveloper === "function" && isDeveloper()) return "dev";
      if (typeof adminLoginKind === "function" && typeof ui !== "undefined") {
        const k = adminLoginKind(ui.adminCode, ui.adminName);
        if (k === "dev" || k === "staff" || k === "boss") return k;
      }
    } catch (e) {}
    return "";
  }
  function cloudKey(k) {
    if (k === "dev") return "repairOrderDev";
    if (k === "staff") return "repairOrderStaff";
    if (k === "boss") return "repairOrderBoss";
    return "";
  }
  function preferLocalOrder() {
    const k = kind();
    const key = cloudKey(k);
    if (!k || !key || typeof state === "undefined" || !state) return;
    const local = readBox()[k];
    const remote = state[key];
    if (local && (!remote || Number(local.at) > Number(remote.at))) state[key] = local;
    else if (remote && (!local || Number(remote.at) >= Number(local.at))) {
      const box = readBox();
      box[k] = remote;
      writeBox(box);
    }
  }
  function currentIds() {
    preferLocalOrder();
    const k = kind();
    const rec = k && readBox()[k];
    return rec && Array.isArray(rec.ids) ? rec.ids.map(String) : null;
  }
  function applyOrder(list) {
    const ids = currentIds();
    if (!list || !ids || !ids.length) return;
    const map = new Map([...list.querySelectorAll(":scope > [data-fold-repair]")].map(el => [el.dataset.foldRepair, el]));
    ids.forEach(id => {
      const el = map.get(id);
      if (el) list.appendChild(el);
    });
  }
  function commit(list) {
    const k = kind();
    const key = cloudKey(k);
    if (!k || !key || !list) return;
    const ids = [...list.querySelectorAll(":scope > [data-fold-repair]")].map(el => el.dataset.foldRepair).filter(Boolean);
    const rec = { ids: ids, at: Date.now() };
    const box = readBox();
    box[k] = rec;
    writeBox(box);
    if (typeof state !== "undefined" && state) state[key] = rec;
    if (typeof save === "function") save();
  }
  function splitRepairLook() {
    if (typeof isDeveloper !== "function" || !isDeveloper()) return;
    document.querySelectorAll("button.repair-look").forEach(btn => {
      const who = btn.querySelector(".repair-who");
      let type = "";
      const kind = btn.querySelector(".repair-kind");
      if (kind) type = kind.textContent.trim();
      else {
        btn.childNodes.forEach(n => { if (n.nodeType === 3) type += n.textContent; });
        type = type.replace(/\s*·\s*$/, "").trim();
      }
      if (!type) return;
      const tid = btn.dataset.lookTenant || "";
      const page = btn.dataset.lookPage || "repair";
      const wrap = document.createElement("span");
      wrap.className = "k repair-look-wrap";
      const look = document.createElement("button");
      look.type = "button";
      look.className = "repair-item-look";
      look.textContent = type;
      look.dataset.lookTenant = tid;
      look.dataset.lookPage = page;
      look.onclick = e => {
        e.preventDefault();
        e.stopPropagation();
        const t = (state.tenants || []).find(x => x && x.id === tid);
        if (!t) { if (typeof toast === "function") toast("找不到租客"); return; }
        if (typeof enterTenantLook === "function") enterTenantLook(t, page);
      };
      wrap.appendChild(look);
      if (who) {
        const rest = document.createElement("span");
        rest.className = "repair-rest";
        rest.appendChild(document.createTextNode(" ·"));
        rest.appendChild(who);
        wrap.appendChild(rest);
      }
      btn.replaceWith(wrap);
    });
  }
  function bindRepairSort() {
    const any = document.querySelector("[data-fold-repair]");
    const list = any && any.parentElement;
    if (!list || list.dataset.sortBound === "1") return;
    if (!kind()) return;
    list.dataset.sortBound = "1";
    applyOrder(list);
    let timer = 0, dragEl = null, armed = false, moved = false, pid = 0, sx = 0, sy = 0, grabY = 0, origin = null, scroller = null;
    const pt = e => {
      if (e.touches && e.touches[0]) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
      return { x: e.clientX, y: e.clientY };
    };
    const clearTimer = () => { if (timer) { clearTimeout(timer); timer = 0; } };
    const syncOrigin = () => {
      if (!dragEl) return;
      const prev = dragEl.style.transform;
      dragEl.style.transform = "none";
      const b = dragEl.getBoundingClientRect();
      dragEl.style.transform = prev;
      origin = { cy: b.top + b.height / 2 };
    };
    const follow = y => {
      if (!dragEl || !origin) return;
      dragEl.style.transition = "none";
      dragEl.style.transform = "translate3d(0," + ((y + grabY) - origin.cy) + "px,0) scale(1.02)";
    };
    const slideOthers = () => {
      const first = new Map();
      [...list.querySelectorAll(":scope > [data-fold-repair]")].forEach(el => {
        if (el !== dragEl) first.set(el, el.getBoundingClientRect());
      });
      return () => {
        [...list.querySelectorAll(":scope > [data-fold-repair]")].forEach(el => {
          if (el === dragEl || !first.has(el)) return;
          const a = first.get(el);
          el.style.transition = "none";
          el.style.transform = "none";
          const b = el.getBoundingClientRect();
          const dy = a.top - b.top;
          if (Math.abs(dy) < 1) return;
          el.style.transform = "translate3d(0," + dy + "px,0)";
          requestAnimationFrame(() => {
            if (!el.isConnected) return;
            el.style.transition = "transform .2s cubic-bezier(.22,.8,.24,1)";
            el.style.transform = "";
          });
        });
      };
    };
    const onMove = e => {
      if (!dragEl) return;
      const p = pt(e);
      if (!armed) {
        if (Math.hypot(p.x - sx, p.y - sy) > 12) { clearTimer(); dragEl = null; }
        return;
      }
      if (e.cancelable) e.preventDefault();
      moved = true;
      if (scroller) {
        const r = scroller.getBoundingClientRect();
        if (p.y < r.top + 56) scroller.scrollTop -= 14;
        else if (p.y > r.bottom - 56) scroller.scrollTop += 14;
      }
      follow(p.y);
      const cards = [...list.querySelectorAll(":scope > [data-fold-repair]")];
      const from = cards.indexOf(dragEl);
      if (from < 0) return;
      const mids = cards.map(el => {
        const prev = el.style.transform;
        el.style.transform = "none";
        const b = el.getBoundingClientRect();
        el.style.transform = prev;
        return b.top + b.height / 2;
      });
      let to = from, best = Infinity;
      mids.forEach((mid, i) => {
        const d = Math.abs(p.y - mid);
        if (d < best) { best = d; to = i; }
      });
      if (to === from) return;
      if (Math.abs(p.y - mids[from]) - best < 10) return;
      const play = slideOthers();
      const ref = to > from ? cards[to + 1] : cards[to];
      if (ref) list.insertBefore(dragEl, ref);
      else list.appendChild(dragEl);
      play();
      syncOrigin();
      follow(p.y);
    };
    const onEnd = () => {
      clearTimer();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onEnd);
      window.removeEventListener("pointercancel", onEnd);
      if (dragEl) {
        dragEl.style.transform = "";
        dragEl.classList.remove("dragging");
        if (armed) {
          dragEl.dataset.suppressClick = "1";
          if (moved) commit(list);
        }
      }
      list.classList.remove("sorting");
      armed = false;
      dragEl = null;
      moved = false;
    };
    const arm = () => {
      if (!dragEl) return;
      armed = true;
      list.classList.add("sorting");
      dragEl.classList.add("dragging");
      scroller = list.closest(".admin-scroll") || document.scrollingElement;
      syncOrigin();
      try { if (navigator.vibrate) navigator.vibrate(12); } catch (e) {}
      try { dragEl.setPointerCapture(pid); } catch (e) {}
      window.addEventListener("pointermove", onMove, { passive: false });
      window.addEventListener("pointerup", onEnd);
      window.addEventListener("pointercancel", onEnd);
    };
    list.addEventListener("click", e => {
      const card = e.target.closest("[data-fold-repair]");
      if (!card || card.dataset.suppressClick !== "1") return;
      delete card.dataset.suppressClick;
      e.preventDefault();
      e.stopPropagation();
    }, true);
    list.addEventListener("contextmenu", e => { if (e.target.closest("[data-fold-repair]")) e.preventDefault(); });
    list.addEventListener("pointerdown", e => {
      if (e.button != null && e.button !== 0) return;
      const card = e.target.closest("[data-fold-repair]");
      if (!card || !list.contains(card)) return;
      if (e.target.closest("a,input,textarea,select,label,.seg,.field")) return;
      if (e.target.closest("button") && !e.target.closest(".repair-look")) return;
      const p = pt(e);
      const r = card.getBoundingClientRect();
      sx = p.x; sy = p.y; pid = e.pointerId;
      grabY = (r.top + r.height / 2) - p.y;
      armed = false; moved = false; dragEl = card;
      clearTimer();
      timer = setTimeout(arm, 320);
    });
    list.addEventListener("pointermove", e => {
      if (armed || !dragEl) return;
      const p = pt(e);
      if (Math.hypot(p.x - sx, p.y - sy) > 12) { clearTimer(); dragEl = null; }
    }, { passive: true });
    list.addEventListener("pointerup", onEnd);
    list.addEventListener("pointercancel", () => { if (armed) onEnd(); });
    list.addEventListener("touchmove", e => {
      if (armed && e.cancelable) e.preventDefault();
    }, { passive: false });
  }
  if (typeof bindAdmin === "function") {
    const orig = bindAdmin;
    bindAdmin = function () {
      const out = orig.apply(this, arguments);
      try { splitRepairLook(); bindRepairSort(); } catch (e) {}
      return out;
    };
  }
  if (typeof pullCloud === "function") {
    const origPull = pullCloud;
    pullCloud = async function () {
      const out = await origPull.apply(this, arguments);
      try { preferLocalOrder(); } catch (e) {}
      return out;
    };
  }
  if (typeof pushCloud === "function") {
    const origPush = pushCloud;
    pushCloud = async function () {
      try { preferLocalOrder(); } catch (e) {}
      return origPush.apply(this, arguments);
    };
  }
  const style = document.createElement("style");
  style.textContent = "[data-fold-repair],[data-fold-repair] .k,[data-fold-repair] .repair-look,[data-fold-repair] .repair-item-look{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}.repair-look-wrap{flex:1;min-width:0;text-align:left}.repair-item-look{appearance:none;border:0;background:none;padding:0;margin:0;font:inherit;font-weight:800;color:var(--ink);cursor:pointer}.repair-rest,.repair-look-wrap .repair-who{color:var(--muted);font-weight:500}.admin-grid.list.sorting{touch-action:none}[data-fold-repair].dragging{position:relative;z-index:4;box-shadow:0 10px 24px rgba(23,33,31,.14)}";
  document.head.appendChild(style);
  const boot = () => { try { splitRepairLook(); bindRepairSort(); } catch (e) {} };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
  setTimeout(boot, 400);
  setTimeout(boot, 1200);
  const app = document.getElementById("app");
  if (app && typeof MutationObserver === "function") {
    new MutationObserver(boot).observe(app, { childList: true, subtree: true });
  }
})();
