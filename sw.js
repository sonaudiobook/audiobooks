const CACHE_NAME = 'audiocuentos-v2';
const urlsToCache = [
    'index.html',
    'manifest.json'
];

// Instalación: forzar la activación inmediata
self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

// Activación: tomar control de los clientes de inmediato
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Estrategia Network-First: buscar primero en la red, si falla usar caché
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request)
            .then(response => {
                // Si la red responde, clonamos y guardamos en caché opcionalmente
                return response;
            })
            .catch(() => {
                // Si no hay internet, recurrimos al caché
                return caches.match(event.request);
            })
    );
});
