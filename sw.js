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
