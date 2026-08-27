const CACHE = "tongjie-app-v4";
const FILES = ["/", "/index.html", "/app.css", "/app.js", "/manifest.json", "/icon-192.png", "/icon-512.png"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("message", e => {
  if (e.data === "SKIP_WAITING") self.skipWaiting();
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
      return res;
    }).catch(() => caches.match(e.request).then(r => r || caches.match("/")))
  );
});
self.addEventListener("push", event => {
  let data = { title: "統潔開發", body: "" };
  try {
    if (event.data) data = event.data.json();
  } catch {
    try { data.body = event.data ? event.data.text() : ""; } catch {}
  }
  event.waitUntil(self.registration.showNotification(data.title || "統潔開發", {
    body: data.body || "",
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    data
  }));
});
self.addEventListener("notificationclick", event => {
  event.notification.close();
  event.waitUntil((async () => {
    const all = await clients.matchAll({ type: "window", includeUncontrolled: true });
    if (event.notification.tag === "tongjie-update") {
      all.forEach(c => c.postMessage({ type: "APPLY_UPDATE" }));
    }
    if (all[0]) return all[0].focus();
    return clients.openWindow("/");
  })());
});
