const CACHE = "tongjie-app-v280";
const BUILD = "20260830-1328";
const FILES = ["/", "/index.html", "/app.css", "/app.js", "/manifest.json", "/icon-192.png", "/icon-512.png", "/icon-maskable-512.png"];
self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES).catch(() => {})));
});
self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => caches.delete(k)));
    await self.clients.claim();
    const cl = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    await Promise.all(cl.map(c => {
      try { c.postMessage({ type: "APPLY_UPDATE" }); } catch {}
      return c.navigate ? c.navigate(c.url).catch(() => {}) : Promise.resolve();
    }));
  })());
});
self.addEventListener("message", e => {
  if (e.data === "SKIP_WAITING") self.skipWaiting();
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;
  e.respondWith((async () => {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 8000);
      const req = new Request(e.request, { cache: "no-store", signal: ctrl.signal });
      const res = await fetch(req);
      clearTimeout(t);
      if (res && res.ok) {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
      }
      return res;
    } catch {
      const cached = await caches.match(e.request);
      return cached || await caches.match("/index.html") || await caches.match("/");
    }
  })());
});
self.addEventListener("push", event => {
  event.waitUntil((async () => {
    const cl = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    if (cl.some(c => c.visibilityState === "visible")) return;
    let data = { title: "統潔＆信潔開發", body: "" };
    try {
      if (event.data) data = event.data.json();
    } catch {
      try { data.body = event.data ? event.data.text() : ""; } catch {}
    }
    await self.registration.showNotification(data.title || "統潔＆信潔開發", {
      body: data.body || "",
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
  event.waitUntil((async () => {
    const all = await clients.matchAll({ type: "window", includeUncontrolled: true });
    if (event.notification.tag === "tongjie-update") {
      all.forEach(c => c.postMessage({ type: "SHOW_CHANGELOG" }));
    }
    if (all[0]) return all[0].focus();
    return clients.openWindow("/");
  })());
});
