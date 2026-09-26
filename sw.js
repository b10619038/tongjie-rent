const CACHE = "tongjie-app-v1562";
const BUILD = "20260926-1047";
const FILES = ["/", "/index.html", "/app.css", "/app.js", "/work-scroll.css", "/work-enhance.js", "/manifest.json", "/icon-192.png", "/icon-512.png", "/icon-maskable-512.png"];
self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES).catch(() => {})));
});
self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener("message", e => {
  if (e.data === "SKIP_WAITING") self.skipWaiting();
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;
  const path = url.pathname;
  if (path.endsWith("/sw.js") || path.endsWith("sw.js")) return;
  const bust = url.search.includes("t=") || url.search.includes("nocache=") || url.search.includes("v=");
  const live = bust || path === "/" || path.endsWith(".html") || path.endsWith(".js") || path.endsWith(".css");
  e.respondWith((async () => {
    try {
      const res = await fetch(e.request, { cache: "no-store" });
      if (res && res.ok && (path === "/" || path.endsWith(".html") || path.endsWith("index.html"))) {
        try {
          const txt = await res.clone().text();
          const m = String(txt).match(/app\.js\?v=(\d+)/);
          if (m && m[1]) pingClients(m[1]);
        } catch {}
      }
      if (res && res.ok && !live) {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
      }
      return res;
    } catch {
      const cached = await caches.match(e.request, { ignoreSearch: true })
        || await caches.match(path)
        || (path.endsWith(".js") ? await caches.match("/app.js") : null)
        || (path.endsWith(".css") ? await caches.match("/app.css") : null)
        || await caches.match("/index.html")
        || await caches.match("/");
      if (cached) return cached;
      if (path.endsWith(".js") || path.endsWith(".css")) {
        return new Response("", { status: 504, statusText: "offline" });
      }
      return new Response("", { status: 504 });
    }
  })());
});
function pingClients(fileVer) {
  const ver = String(fileVer || "");
  if (!ver || pingClients.last === ver) return;
  pingClients.last = ver;
  self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
    list.forEach(c => {
      try { c.postMessage({ type: "NEW_BUILD", fileVer: ver }); } catch {}
    });
  }).catch(() => {});
}
async function pingBuild() {
  try {
    const res = await fetch("/index.html?nocache=1&t=" + Date.now(), { cache: "no-store" });
    if (!res || !res.ok) return;
    const txt = await res.text();
    const m = String(txt).match(/app\.js\?v=(\d+)/);
    if (m && m[1]) pingClients(m[1]);
  } catch {}
}
setInterval(pingBuild, 4000);
pingBuild();
self.addEventListener("push", event => {
  event.waitUntil((async () => {
    let data = { title: "統潔＆信潔開發", body: "" };
    try {
      if (event.data) data = event.data.json();
    } catch {
      try { data.body = event.data ? event.data.text() : ""; } catch {}
    }
    const cl = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    const visible = cl.some(c => c.visibilityState === "visible");
    if (visible) return;
    await self.registration.showNotification(data.title || "統潔＆信潔開發", {
      body: data.body || "",
      icon: "/icon-192.png",
      badge: "/icon-192.png",
      lang: "zh-Hant",
      subtitle: data.subtitle || "統潔開發",
      vibrate: [200, 80, 200],
      tag: data.tag || "tongjie",
      renotify: true,
      silent: false,
      data
    });
  })());
});
self.addEventListener("notificationclick", event => {
  event.notification.close();
  const note = event.notification;
  const data = note.data || {};
  const tag = String(note.tag || data.tag || "");
  const title = String(note.title || data.title || "");
  const chat = !!(data.chat || tag.indexOf("chat-") === 0 || title === "新訊息");
  const tid = String(data.tid || "");
  const page = String(data.page || "");
  const rawBody = String(data.body || note.body || "");
  const mid = String(data.mid || (tag.indexOf("chat-") === 0 ? tag.slice(5) : ""));
  event.waitUntil((async () => {
    const all = await clients.matchAll({ type: "window", includeUncontrolled: true });
    if (tag === "tongjie-update") all.forEach(c => c.postMessage({ type: "SHOW_CHANGELOG" }));
    const msg = { type: "OPEN", page: chat ? "home" : page, chat, tid, mid, mtxt: rawBody };
    let url = new URL("./", self.registration.scope).href;
    if (chat) {
      url += "?open=chat"
        + (tid ? "&tid=" + encodeURIComponent(tid) : "")
        + (mid ? "&mid=" + encodeURIComponent(mid) : "")
        + (rawBody ? "&mtxt=" + encodeURIComponent(rawBody) : "");
    }
    const mine = all.find(c => String(c.url || "").indexOf(self.registration.scope) === 0) || all[0];
    if (mine) {
      try { await mine.focus(); } catch {}
      try { mine.postMessage(msg); } catch {}
      if (chat && typeof mine.navigate === "function") {
        try { await mine.navigate(url); } catch {}
      }
      return;
    }
    if (clients.openWindow) return clients.openWindow(chat ? url : new URL("./", self.registration.scope).href);
  })());
});
