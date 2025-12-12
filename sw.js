// sw.js
const CACHE_NAME = 'chorty-v2.2';
const urlsToCache = [
  '/',
  '/index.html',
  // Adicione outros recursos se necessário
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});