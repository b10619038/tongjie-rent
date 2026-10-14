(function () {
  const LIVE = "tj-repair-live-v1";
  const TOPIC = "tongjie/tj-82934388/repair";
  const STAT = "tongjie_repair_stat_v1";
  let device = "repair";
  try {
    device = localStorage.getItem("tj-repair-device") || "";
    if (!device) {
      device = "d" + Math.random().toString(16).slice(2) + Date.now().toString(16);
      localStorage.setItem("tj-repair-device", device);
    }
  } catch (e) {}

  function readBox() {
    try { return JSON.parse(localStorage.getItem(LIVE) || "{}") || {}; } catch (e) { return {}; }
  }
  function writeBox(box) {
    try { localStorage.setItem(LIVE, JSON.stringify(box || {})); } catch (e) {}
  }
  function remember(id, status, at) {
    if (!id || !status) return false;
    const box = readBox();
    const stamp = Number(at) || Date.now();
    const cur = box[id];
    if (cur && Number(cur.statusAt || 0) > stamp) return false;
    if (cur && cur.status === status && Number(cur.statusAt || 0) === stamp) return false;
    box[id] = { status: status, statusAt: stamp };
    writeBox(box);
    return true;
  }
  function applyBox(list) {
    const box = readBox();
    let changed = false;
    (list || []).forEach(function (r) {
      if (!r || !r.id || !box[r.id]) return;
      const hit = box[r.id];
      const at = Number(hit.statusAt) || 0;
      if (!hit.status || at < Number(r.statusAt || 0)) return;
      if (r.status === hit.status && Number(r.statusAt || 0) >= at) return;
      r.status = hit.status;
      r.statusAt = at;
      if (at > Number(r.editedAt || 0)) r.editedAt = at;
      changed = true;
    });
    return changed;
  }
  function paint() {
    try { if (typeof ui !== "undefined" && ui) ui.keepScroll = true; } catch (e) {}
    try { if (typeof render === "function") render(); } catch (e) {}
  }
  function push() {
    try { if (typeof markCloudDirty === "function") markCloudDirty(); } catch (e) {}
    try { if (typeof pushCloud === "function") pushCloud(); } catch (e) {}
  }

  const origStringify = JSON.stringify;
  JSON.stringify = function (value) {
    try {
      if (value && Array.isArray(value.repairs) && (Array.isArray(value.rooms) || Array.isArray(value.tenants))) {
        applyBox(value.repairs);
      }
    } catch (e) {}
    return origStringify.apply(JSON, arguments);
  };

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
        }
        publishSoon();
        push();
        paint();
      } catch (err) {}
    }, 30);
  }, true);

  let ws = null;
  let wsTry = 0;
  let pubTimer = 0;
  function boxPayload() {
    const box = readBox();
    const repairs = [];
    Object.keys(box).forEach(function (id) {
      const x = box[id];
      if (!x || !x.status) return;
      repairs.push({ id: id, status: x.status, statusAt: Number(x.statusAt) || 0 });
    });
    if (!repairs.length) return "";
    return origStringify({ at: Date.now(), device: device, repairs: repairs });
  }
  function publishNow() {
    const payload = boxPayload();
    if (!payload) return;
    if (!(ws && ws.readyState === 1) || typeof mqttPubPkt !== "function") {
      connect();
      return;
    }
    try { ws.send(mqttPubPkt(TOPIC, payload, true)); } catch (e) {}
  }
  function publishSoon() {
    clearTimeout(pubTimer);
    pubTimer = setTimeout(publishNow, 40);
  }
  function applyPacket(raw) {
    let o = null;
    try { o = typeof raw === "string" ? JSON.parse(raw) : raw; } catch (e) { return; }
    if (!o || !Array.isArray(o.repairs)) return;
    let learned = false;
    o.repairs.forEach(function (x) {
      if (!x || !x.id || !x.status) return;
      if (remember(x.id, x.status, Number(x.statusAt) || Number(o.at) || 0)) learned = true;
    });
    let painted = false;
    try {
      if (typeof state !== "undefined" && state && applyBox(state.repairs)) painted = true;
    } catch (e) {}
    if (painted) {
      paint();
      push();
    }
    if (learned) publishSoon();
  }
  function connect() {
    if (ws && (ws.readyState === 0 || ws.readyState === 1)) return;
    if (typeof mqttConnectPkt !== "function" || typeof mqttParsePublish !== "function") return;
    const urls = ["wss://broker.emqx.io:8084/mqtt", "wss://broker.hivemq.com:8884/mqtt"];
    const url = urls[wsTry % urls.length];
    try {
      const sock = new WebSocket(url, "mqtt");
      ws = sock;
      sock.binaryType = "arraybuffer";
      sock.onopen = function () { try { sock.send(mqttConnectPkt()); } catch (e) {} };
      sock.onmessage = function (ev) {
        let pkt = null;
        try { pkt = mqttParsePublish(ev.data); } catch (e) { return; }
        if (!pkt) return;
        if (pkt.type === 2) {
          try { sock.send(mqttSubPkt(TOPIC)); } catch (e) {}
          publishNow();
          return;
        }
        if (pkt.type === 3 && pkt.topic === TOPIC && pkt.payload) applyPacket(pkt.payload);
      };
      sock.onclose = function () {
        if (ws === sock) ws = null;
        wsTry += 1;
        setTimeout(connect, 1500);
      };
      sock.onerror = function () { try { sock.close(); } catch (e) {} };
    } catch (e) {
      setTimeout(connect, 2000);
    }
  }

  function heal() {
    try {
      if (typeof state === "undefined" || !state || !Array.isArray(state.repairs)) return;
      if (applyBox(state.repairs)) {
        paint();
        push();
      }
    } catch (e) {}
  }

  function seedDone() {
    try {
      if (typeof state === "undefined" || !state || !Array.isArray(state.repairs) || !state.repairs.length) return false;
      let map = {};
      try { map = JSON.parse(localStorage.getItem(STAT) || "{}") || {}; } catch (e) { map = {}; }
      let changed = false;
      Object.keys(map).forEach(function (id) {
        const cur = map[id];
        if (!cur || cur.status !== "done") return;
        const hit = readBox()[id];
        if (hit && hit.status && hit.status !== "done" && Number(hit.statusAt || 0) > Number(cur.statusAt || 0)) return;
        const at = Math.max(Date.now(), Number(cur.statusAt) || 0, Number(hit && hit.statusAt) || 0);
        if (!hit || hit.status !== "done") {
          if (remember(id, "done", at)) changed = true;
        }
      });
      (state.repairs || []).forEach(function (r) {
        if (!r || r.status !== "done" || !r.id) return;
        const hit = readBox()[r.id];
        if (hit && hit.status === "done") return;
        if (hit && hit.status && hit.status !== "done" && Number(hit.statusAt || 0) >= Number(r.statusAt || 0)) return;
        if (remember(r.id, "done", Number(r.statusAt) || Date.now())) changed = true;
      });
      if (applyBox(state.repairs)) changed = true;
      if (changed) {
        publishSoon();
        push();
        paint();
      } else publishSoon();
      return true;
    } catch (e) { return false; }
  }

  let seeded = false;
  function trySeed() {
    if (seeded) return;
    if (seedDone()) seeded = true;
  }

  connect();
  setTimeout(trySeed, 600);
  setTimeout(trySeed, 1800);
  setTimeout(trySeed, 4000);
  setInterval(heal, 1000);
  setInterval(publishNow, 8000);
})();
