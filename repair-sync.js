(function () {
  const BOX = "tj-repair-status-box";
  function readBox() {
    try { return JSON.parse(localStorage.getItem(BOX) || "{}") || {}; } catch { return {}; }
  }
  function writeBox(box) {
    try { localStorage.setItem(BOX, JSON.stringify(box || {})); } catch {}
  }
  function remember(id, status, at) {
    if (!id || !status) return;
    const box = readBox();
    const stamp = Number(at) || Date.now();
    const cur = box[id];
    if (cur && Number(cur.statusAt || 0) > stamp) return;
    box[id] = { status: status, statusAt: stamp };
    writeBox(box);
  }
  function applyBox(list) {
    const box = readBox();
    (list || []).forEach(function (r) {
      if (!r || !r.id || !box[r.id]) return;
      const hit = box[r.id];
      const at = Number(hit.statusAt) || 0;
      if (!hit.status || at < Number(r.statusAt || 0)) return;
      if (r.status === hit.status && Number(r.statusAt || 0) >= at) return;
      r.status = hit.status;
      r.statusAt = at;
      if (at > Number(r.editedAt || 0)) r.editedAt = at;
    });
  }
  function publish(rep) {
    if (!rep || !rep.id || typeof mqttPubPkt !== "function") return;
    const pkt = {
      at: Date.now(),
      device: typeof liveDeviceId === "function" ? liveDeviceId() : "repair",
      repairs: [{ id: rep.id, status: rep.status || "open", statusAt: Number(rep.statusAt) || Date.now() }]
    };
    try {
      if (!(paidWs && paidWs.readyState === 1)) {
        if (typeof connectPaidCloud === "function") connectPaidCloud();
        return;
      }
      paidWs.send(mqttPubPkt("tongjie/tj-82934388/live", JSON.stringify(pkt), false));
    } catch {}
  }
  function paint() {
    try { if (typeof ui !== "undefined" && ui) ui.keepScroll = true; } catch {}
    try { if (typeof render === "function") render(); } catch {}
  }
  document.addEventListener("click", function (e) {
    const btn = e.target && e.target.closest && e.target.closest("[data-rep-status]");
    if (!btn) return;
    const parts = String(btn.dataset.repStatus || "").split("|");
    const id = parts[0];
    const status = parts[1];
    if (!id || !status) return;
    const at = Date.now();
    remember(id, status, at);
    setTimeout(function () {
      try {
        const rep = (state.repairs || []).find(function (r) { return r && r.id === id; });
        if (rep) {
          rep.status = status;
          rep.statusAt = at;
          if (at > Number(rep.editedAt || 0)) rep.editedAt = at;
          publish(rep);
        }
        if (typeof pushCloud === "function") pushCloud();
      } catch {}
    }, 40);
  }, true);
  if (typeof ingestLiveCloud === "function" && !ingestLiveCloud.__repairSync) {
    const prev = ingestLiveCloud;
    ingestLiveCloud = function (raw) {
      try {
        const o = typeof raw === "string" ? JSON.parse(raw) : raw;
        const mine = typeof liveDeviceId === "function" ? liveDeviceId() : "";
        if (o && o.device !== mine && Array.isArray(o.repairs)) {
          let changed = false;
          o.repairs.forEach(function (x) {
            if (!x || !x.id || !x.status) return;
            const cur = (state.repairs || []).find(function (r) { return r && r.id === x.id; });
            if (!cur) return;
            const at = Number(x.statusAt) || Number(o.at) || 0;
            if (at < Number(cur.statusAt || 0)) return;
            if (cur.status === x.status && Number(cur.statusAt || 0) >= at) return;
            cur.status = x.status;
            cur.statusAt = at;
            if (at > Number(cur.editedAt || 0)) cur.editedAt = at;
            remember(x.id, x.status, at);
            changed = true;
          });
          if (changed) paint();
        }
      } catch {}
      return prev.apply(this, arguments);
    };
    ingestLiveCloud.__repairSync = true;
  }
  const origStringify = JSON.stringify;
  JSON.stringify = function (value) {
    try {
      if (value && Array.isArray(value.repairs) && Array.isArray(value.rooms)) applyBox(value.repairs);
    } catch {}
    return origStringify.apply(JSON, arguments);
  };
  function seedDone() {
    let map = {};
    try { map = JSON.parse(localStorage.getItem("tongjie_repair_stat_v1") || "{}") || {}; } catch {}
    let changed = false;
    Object.keys(map).forEach(function (id) {
      const cur = map[id];
      if (!cur || cur.status !== "done") return;
      const rep = (state.repairs || []).find(function (r) { return r && r.id === id; });
      if (!rep || rep.status === "done") return;
      const at = Date.now();
      remember(id, "done", at);
      rep.status = "done";
      rep.statusAt = at;
      rep.editedAt = at;
      publish(rep);
      changed = true;
    });
    if (changed) {
      try { if (typeof markCloudDirty === "function") markCloudDirty(); } catch {}
      try { if (typeof pushCloud === "function") pushCloud(); } catch {}
      paint();
    }
  }
  setTimeout(seedDone, 1200);
})();
