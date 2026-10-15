(function () {
  function fix7021(data) {
    if (!data || !Array.isArray(data.tenants)) return false;
    const room = (data.rooms || []).find(function (r) { return r && String(r.no) === "7021"; });
    const t = data.tenants.find(function (x) {
      return x && !x.former && !x.demo && ((room && (x.roomId === room.id || x.id === room.tenantId)) || /陳信安/.test(String(x.name || "")));
    });
    if (!t || (t.name && !/陳信安/.test(String(t.name)))) return false;
    let changed = false;
    if (t.name !== "陳信安") { t.name = "陳信安"; changed = true; }
    if (t.invoiceBuyer && t.invoiceBuyer !== "陳信安") { t.invoiceBuyer = "陳信安"; changed = true; }
    try {
      if (typeof TENANT_INFO === "object" && TENANT_INFO["7021"] && TENANT_INFO["7021"].name !== "陳信安") {
        TENANT_INFO["7021"].name = "陳信安";
      }
    } catch (e) {}
    (data.renewals || []).forEach(function (row) {
      if (!row || row.status === "cancelled") return;
      if (String(row.roomNo) !== "7021" && row.tenantId !== t.id && !(room && row.roomId === room.id)) return;
      if (row.name !== "陳信安") { row.name = "陳信安"; changed = true; }
      if (row.renewNames !== "陳信安") { row.renewNames = "陳信安"; changed = true; }
      if (Array.isArray(row.people) && row.people.some(function (p) { return p && /吳舉珉/.test(String(p.name || "")); })) {
        row.people = row.people.filter(function (p) { return p && !/吳舉珉/.test(String(p.name || "")); });
        changed = true;
      }
    });
    return changed;
  }
  const prev = typeof apply7021Rotate === "function" ? apply7021Rotate : null;
  apply7021Rotate = function (data) {
    if (prev) { try { prev(data); } catch (e) {} }
    return fix7021(data);
  };
  function heal() {
    try {
      if (typeof state === "undefined") return;
      if (!fix7021(state)) return;
      try { markCloudDirty(); } catch (e) {}
      try { save(true); } catch (e) {}
      try { pushCloud(); } catch (e) {}
      try { render(); } catch (e) {}
    } catch (e) {}
  }
  heal();
  setInterval(heal, 2000);
})();
