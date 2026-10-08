'use strict';
const CACHE = 'quote-challenge-entrance-510-v1';
const FILES = ['./index.html','./bonus.html','./manifest.webmanifest','./assets/theater-entrance.png','./assets/report-button.png','./assets/squire-of-gothos.jpg','./assets/uhura-journey-to-the-stars.jpg','./assets/qc-192.png','./assets/qc-512.png'];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES))));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))));
self.addEventListener('fetch', event => event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request))));
