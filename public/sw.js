// Simple service worker for ESOL Games
// Caches app shell and serves static assets with a stale-while-revalidate strategy.

const CACHE_VERSION = 'v1.0.0';
const APP_SHELL_CACHE = `esol-shell-${CACHE_VERSION}`;
const RUNTIME_CACHE = `esol-runtime-${CACHE_VERSION}`;

const APP_SHELL = [
  '/',
  '/index.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(APP_SHELL_CACHE).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.map((key) => {
          if (key !== APP_SHELL_CACHE && key !== RUNTIME_CACHE) {
            return caches.delete(key);
          }
        })
      );
      await self.clients.claim();
    })()
  );
});

// Helper: decide if request is for a static asset
const isStaticAsset = (request) => {
  const url = new URL(request.url);
  return (
    url.origin === self.location.origin &&
    (/\.(?:js|css|svg|png|jpg|jpeg|gif|webp|ico|ttf|woff2?)$/i.test(url.pathname) || url.pathname.startsWith('/assets/'))
  );
};

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Navigation requests: network-first with cache fallback to index.html
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const networkResponse = await fetch(request);
          const cache = await caches.open(APP_SHELL_CACHE);
          cache.put('/index.html', networkResponse.clone());
          return networkResponse;
        } catch (err) {
          const cached = await caches.match('/index.html');
          return cached || new Response('Offline', { status: 503, statusText: 'Offline' });
        }
      })()
    );
    return;
  }

  // Static assets: stale-while-revalidate
  if (isStaticAsset(request)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(RUNTIME_CACHE);
        const cached = await cache.match(request);
        const networkPromise = fetch(request)
          .then((response) => {
            if (response && response.status === 200) {
              cache.put(request, response.clone());
            }
            return response;
          })
          .catch(() => cached);
        return cached || networkPromise;
      })()
    );
    return;
  }

  // Google Sheets CSV and other cross-origin: network-first with cache fallback
  if (/^https:\/\/(docs\.google\.com|docs\.googleusercontent\.com)\//.test(request.url)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(RUNTIME_CACHE);
        try {
          const response = await fetch(request);
          if (response && response.status === 200) {
            cache.put(request, response.clone());
          }
          return response;
        } catch (err) {
          const cached = await cache.match(request);
          return cached || new Response('Offline data unavailable', { status: 504 });
        }
      })()
    );
  }
});

