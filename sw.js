/* Service Worker VATM — cache giao diện, ưu tiên mạng; hiển thị thông báo từ trang. */
const CACHE = 'vatm-shell-v1';
const SHELL = ['./', './index.html', './manifest.json', './icons/icon-192.svg', './icons/icon-192.png', './icons/icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).catch(() => {}));
  self.skipWaiting();
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Chỉ cache tài nguyên cùng nguồn; dữ liệu Firebase và CDN đi thẳng qua mạng.
  if (url.origin !== location.origin) return;
  e.respondWith(
    fetch(req).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
      return res;
    }).catch(() => caches.match(req).then((r) => r || caches.match('./index.html')))
  );
});
self.addEventListener('message', (e) => {
  const d = e.data || {};
  if (d.type === 'SHOW_NOTIFICATION') {
    self.registration.showNotification(d.title || 'VATM', {
      body: d.body || '',
      tag: d.tag || 'vatm-work',
      icon: 'icons/icon-192.png',
      badge: 'icons/icon-192.png',
      renotify: true
    });
  }
});
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window' }).then((list) => {
    if (list.length) return list[0].focus();
    return self.clients.openWindow('./index.html');
  }));
});
