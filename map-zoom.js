(function () {
  if (window.__mapZoomNative) return;
  const style = document.createElement("style");
  style.textContent = ".asset-map-turn.is-glide{transition:transform .48s cubic-bezier(.22,.82,.24,1)}";
  document.head.appendChild(style);
  function glide(z, x, y) {
    const turn = document.getElementById("asset-map-turn");
    if (!turn || typeof ui === "undefined" || typeof ui.mapLayout !== "function") return;
    turn.classList.add("is-glide");
    void turn.offsetWidth;
    ui.assetMapZoom = z;
    ui.assetMapX = x;
    ui.assetMapY = y;
    ui.mapLayout();
    clearTimeout(ui.mapGlideTimer);
    ui.mapGlideTimer = setTimeout(() => turn.classList.remove("is-glide"), 520);
  }
  function focusSpot(btn) {
    const wrap = document.getElementById("asset-map-wrap");
    if (!wrap || !btn) return;
    const br = btn.getBoundingClientRect();
    const wr = wrap.getBoundingClientRect();
    const sx = (br.left + br.width / 2) - (wr.left + wr.width / 2);
    const sy = (br.top + br.height / 2) - (wr.top + wr.height / 2);
    const z0 = Math.max(1, Number(ui.assetMapZoom) || 1);
    const tx0 = Number(ui.assetMapX) || 0;
    const ty0 = Number(ui.assetMapY) || 0;
    const hx = (sx - tx0) / z0;
    const hy = (sy - ty0) / z0;
    glide(2, -2 * hx, -2 * hy);
  }
  function hook() {
    const wrap = document.getElementById("asset-map-wrap");
    const turn = document.getElementById("asset-map-turn");
    if (wrap && turn && wrap.dataset.glideOff !== "1") {
      wrap.dataset.glideOff = "1";
      wrap.addEventListener("pointerdown", e => {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        if (e.target && e.target.closest && e.target.closest("[data-map-spot]")) return;
        turn.classList.remove("is-glide");
      }, true);
    }
    document.querySelectorAll("[data-map-spot]").forEach(btn => {
      if (btn.dataset.zoomHook === "1") return;
      btn.dataset.zoomHook = "1";
      btn.addEventListener("click", () => {
        if (typeof ui === "undefined" || ui.mapSkipClick) return;
        const i = Number(btn.dataset.mapSpot);
        if (ui.assetMapSpot !== i) glide(1, 0, 0);
        else focusSpot(btn);
      });
    });
  }
  const boot = () => { try { hook(); } catch (e) {} };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
  setTimeout(boot, 400);
  setTimeout(boot, 1200);
  const app = document.getElementById("app");
  if (app && typeof MutationObserver === "function") new MutationObserver(boot).observe(app, { childList: true, subtree: true });
})();
