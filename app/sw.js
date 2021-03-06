const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
    '/bundle.js',
];

self.addEventListener('install', (event) => {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        }),
    );
});
