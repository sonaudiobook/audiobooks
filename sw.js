const CACHE_NAME = 'audiocuentos-v1';
const assetsToCache = [
  'index.html',
  'manifest.json',
  'hero.jpg',
  'pipo.jpg',
  'mochila.jpg',
  'relojero.jpg',
  'astronauta.jpg',
  'bot.jpg',
  'sombreros.jpg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assetsToCache);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});