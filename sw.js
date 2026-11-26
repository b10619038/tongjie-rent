const CACHE = "tongjie-app-v2431";
const MEDIA = "tongjie-media-v1";
const BUILD = "20261003-1398";
const FILES = ["/", "/index.html", "/app.css", "/app.js", "/html2canvas.min.js", "/fonts/iansui-tc.woff2", "/fonts/iansui-latin.woff2", "/i18n.js", "/i18n-pack.js", "/birthday.js", "/name-7021.js", "/repair-sync.js", "/work-scroll.css", "/work-enhance.js", "/manifest.json", "/icon-192.png", "/icon-512.png", "/icon-maskable-512.png", "/images/notify-badge.png", "/images/asset-map.webp", "/images/chop-company.png", "/images/chop-zhao.png", "/images/splash-house.png"];
self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES).catch(() => {})));
});
self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE && k !== MEDIA).map(k => caches.delete(k)));
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
  if (isMediaPath(path)) {
    e.respondWith(mediaResponse(e.request, path));
    return;
  }
  if (path.endsWith("/images/asset-map.webp")) {
    e.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const cached = await cache.match("/images/asset-map.webp");
      const fresh = fetch(e.request).then(res => {
        if (res && res.ok) cache.put("/images/asset-map.webp", res.clone()).catch(() => {});
        return res;
      }).catch(() => null);
      if (cached) return cached;
      return (await fresh) || new Response("", { status: 504 });
    })());
    return;
  }
  const bust = url.search.includes("t=") || url.search.includes("nocache=") || url.search.includes("v=");
  const live = bust || path === "/" || path.endsWith(".html") || path.endsWith(".js") || path.endsWith(".css") || path.endsWith("manifest.json");
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
function isMediaPath(path) {
  return /\.(png|jpe?g|gif|webp|svg|ico|mp4|webm|mov|m4v|mp3|m4a|woff2?)$/i.test(path);
}
async function slicedRange(full, range) {
  const m = /bytes=(\d+)-(\d*)/.exec(range || "");
  if (!m) return full;
  const buf = await full.arrayBuffer();
  const size = buf.byteLength;
  let start = Number(m[1]) || 0;
  let end = m[2] ? Number(m[2]) : size - 1;
  if (start >= size) return new Response(null, { status: 416, headers: { "Content-Range": "bytes */" + size } });
  if (end >= size) end = size - 1;
  const slice = buf.slice(start, end + 1);
  const type = full.headers.get("Content-Type") || "application/octet-stream";
  return new Response(slice, {
    status: 206,
    headers: {
      "Content-Type": type,
      "Content-Range": "bytes " + start + "-" + end + "/" + size,
      "Accept-Ranges": "bytes",
      "Content-Length": String(slice.byteLength)
    }
  });
}
function mediaResponse(request, path) {
  const range = request.headers.get("range");
  return (async () => {
    const cache = await caches.open(MEDIA);
    const cached = await cache.match(request) || await cache.match(path);
    const fill = fetch(new Request(request.url, { method: "GET" })).then(res => {
      if (!res || !res.ok) return null;
      const a = res.clone();
      const b = res.clone();
      cache.put(request.url, a).catch(() => {});
      cache.put(path, b).catch(() => {});
      return res;
    }).catch(() => null);
    if (range) {
      if (cached) return slicedRange(cached, range);
      const res = await fill;
      if (res) return slicedRange(res, range);
      return new Response("", { status: 504 });
    }
    if (cached) return cached;
    return (await fill) || new Response("", { status: 504 });
  })();
}
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
    const res = await fetch("/?nocache=1&t=" + Date.now(), { cache: "no-store" });
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
    const title = data.title || "統潔＆信潔開發";
    const body = data.body || "";
    await self.registration.showNotification(title, {
      body,
      icon: "/icon-192.png",
      badge: "/images/notify-badge.png",
      lang: "zh-Hant",
      subtitle: data.subtitle || "統潔開發",
      vibrate: [200, 80, 200],
      tag: data.tag || ("tongjie-" + title),
      renotify: true,
      silent: false,
      data
    });
    try {
      const cl = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
      cl.forEach(c => {
        try { c.postMessage({ type: "PUSH", title, body, tag: data.tag || "", page: data.page || "" }); } catch {}
      });
    } catch {}
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
