(function () {
  if (typeof adminLoginKind !== "function") return;
  if (adminLoginKind("1976", "趙正賢") !== "boss") {
    const prevKind = adminLoginKind;
    adminLoginKind = function (code, name) {
      const c = String(code || "").replace(/[０-９]/g, function (ch) { return String.fromCharCode(ch.charCodeAt(0) - 0xFEE0); }).replace(/\s+/g, "");
      const n = typeof normAdminName === "function" ? normAdminName(name) : String(name || "").replace(/\s+/g, "").trim();
      if (c === "1976" && n === "趙正賢") return "boss";
      if (c === "7651" && n === "趙海城") return "boss";
      return prevKind(code, name);
    };
    const prevKey = presenceKey;
    presenceKey = function () {
      if (typeof ui !== "undefined" && ui && ui.role === "admin" && ui.adminCode === "7651" && normAdminName(ui.adminName) === "趙海城") return "admin-7651-趙海城";
      return prevKey();
    };
    const prevTry = tryLogin;
    tryLogin = function () {
      if (!ui || ui.page !== "admin-login") return prevTry();
      const input = document.getElementById("room-login");
      const no = String((input && input.value) || ui.loginAdmin || "")
        .replace(/[０-９]/g, function (ch) { return String.fromCharCode(ch.charCodeAt(0) - 0xFEE0); })
        .replace(/\s+/g, "");
      const nameEl = document.getElementById("admin-name");
      const name = String((nameEl && nameEl.value) || ui.loginAdminName || "").trim();
      ui.loginAdmin = no;
      ui.loginAdminName = name;
      if (!name) { ui.loginError = "請輸入姓名"; render(); return; }
      if (!no) { ui.loginError = "請輸入密碼"; render(); return; }
      const kind = adminLoginKind(no, name);
      if (!kind) {
        ui.loginError = "姓名或密碼不正確";
        try { audit("登入失敗", "嘗試負責人 " + name); } catch (e) {}
        render();
        return;
      }
      ui.role = "admin";
      ui.adminCode = kind === "dev" ? "1240" : no;
      ui.adminName = name;
      ui.page = typeof adminLandingPage === "function" ? adminLandingPage() : "dash";
      ui.loginError = "";
      ui.loginAdmin = "";
      try { persistUi(); } catch (e) {}
      try { audit("登入", (kind === "dev" ? "開發者 " : kind === "boss" ? "負責人 " : "管理員 ") + name); } catch (e) {}
      try { beatPresence(); } catch (e) {}
      render();
      try { enablePush(true).then(function () { try { maybeNudgeNotifies(); } catch (e) {} }); } catch (e) {}
      try { armPushAsk(); } catch (e) {}
    };
    if (typeof biometricLogin === "function") {
      const prevBio = biometricLogin;
      biometricLogin = async function () {
        const rec = typeof loadBio === "function" ? loadBio() : null;
        const kind = rec && rec.role === "admin" && rec.adminName ? adminLoginKind(rec.adminCode, rec.adminName) : "";
        if (kind !== "boss") return prevBio();
        if (!bioSupport()) { toast("這台裝置不支援指紋或面容"); return; }
        try {
          await navigator.credentials.get({
            publicKey: {
              challenge: crypto.getRandomValues(new Uint8Array(32)),
              rpId: location.hostname,
              allowCredentials: [{ type: "public-key", id: b64ToBuf(rec.credId) }],
              userVerification: "required",
              timeout: 60000
            }
          });
        } catch (err) {
          if (err && err.name === "NotAllowedError") toast("已取消");
          else toast("辨識失敗，請改用密碼");
          return;
        }
        ui.role = "admin";
        ui.adminCode = String(rec.adminCode || "");
        ui.adminName = rec.adminName || "";
        ui.page = adminLandingPage();
        ui.loginError = "";
        try { persistUi(); } catch (e) {}
        try { audit("登入", "快速登入 " + (ui.adminName || rec.adminCode)); } catch (e) {}
        try { beatPresence(); } catch (e) {}
        render();
        try { enablePush().then(function () { try { maybeNudgeNotifies(); } catch (e) {} }); } catch (e) {}
        try { armPushAsk(); } catch (e) {}
      };
    }
  }
  if (typeof onlineStaffHtml === "function" && String(onlineStaffHtml).indexOf("趙正賢") < 0) {
    const prevOnline = onlineStaffHtml;
    onlineStaffHtml = function () {
      const html = prevOnline();
      if (!html || html.indexOf("趙正賢") >= 0) return html;
      const row = html.match(/<div class="online-row">(?:(?!<div class="online-row">)[\s\S])*?管理員（1976）[\s\S]*?<\/div>/);
      const haichengOn = typeof isOnline === "function" && isOnline("admin-7651-趙海城");
      const boss = '<div class="online-row"><span class="k">趙海城（7651）</span><span class="row-end"><span class="live-pill' + (haichengOn ? " on" : "") + '" data-online="admin-7651-趙海城">' + (haichengOn ? "在線中" : "離線中") + "</span></span></div>";
      let next = html.replace("管理員（1976）", "趙正賢（1976）");
      if (row && next.indexOf("趙海城") < 0) {
        const at = next.indexOf(row[0].replace("管理員（1976）", "趙正賢（1976）"));
        const chunk = row[0].replace("管理員（1976）", "趙正賢（1976）");
        if (at >= 0) next = next.slice(0, at + chunk.length) + boss + next.slice(at + chunk.length);
      }
      return next;
    };
    setInterval(function () {
      document.querySelectorAll("[data-online='admin-7651-趙海城']").forEach(function (el) {
        const on = typeof isOnline === "function" && isOnline("admin-7651-趙海城");
        el.classList.toggle("on", !!on);
        el.textContent = on ? "在線中" : "離線中";
      });
    }, 3000);
  }
  function retitle(html) {
    return String(html || "")
      .replace(/管理員後台/g, "負責人後台")
      .replace(/管理員登入/g, "負責人登入")
      .replace(/管理員姓名/g, "負責人姓名")
      .replace(/管理員密碼/g, "負責人密碼")
      .replace("開發者、管理員與正在使用 App 的租客。", "開發者、負責人與正在使用 App 的租客。");
  }
  function retitleDoor(html) {
    return retitle(html)
      .replace(">負責人後台<", ">後台登入<")
      .replace(">負責人登入<", ">後台登入<")
      .replace("請輸入負責人姓名與密碼後，查看全部房間、租客與報修。", "管理員、開發者、負責人都可以從這裡進入。")
      .replace("請輸入負責人姓名與密碼，進入後台", "請輸入姓名與密碼。管理員、開發者、負責人都可以從這裡進入。")
      .replace('placeholder="負責人姓名"', 'placeholder="姓名"')
      .replace('placeholder="負責人密碼"', 'placeholder="密碼"');
  }
  if (typeof gateView === "function" && !gateView._door) {
    const prev = gateView;
    gateView = function () { return retitleDoor(prev.apply(this, arguments)); };
    gateView._door = 1;
  }
  if (typeof adminView === "function" && !adminView._boss) {
    const prev = adminView;
    adminView = function () { return retitle(prev.apply(this, arguments)); };
    adminView._boss = 1;
  }
  if (typeof adminLogs === "function" && !adminLogs._boss) {
    const prev = adminLogs;
    adminLogs = function () { return retitle(prev.apply(this, arguments)); };
    adminLogs._boss = 1;
  }
})();
