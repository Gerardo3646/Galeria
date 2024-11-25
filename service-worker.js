const CACHE_NAME = "gallery-cache-v1";
const urlsToCache = [
    "./",
    "./index.html",
    "./style.css",
    "./manifest.json",
    "./img/img1.jpg",
    "./img/img2.jpg",
    "./img/img3.webp",
    "./img/img4.webp",
    "./img/img5.jpg",
    "./img/img6.jpg",
    "./img/img7.jpg"
];

// Instalación del Service Worker
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Activación del Service Worker
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Intercepción de solicitudes
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// Manejo de notificaciones
self.addEventListener("notificationclick", (event) => {
    event.notification.close(); // Cerrar la notificación al hacer clic
    event.waitUntil(
        clients.openWindow("https://gerardo3646.github.io/Galeria/") // Cambiar por la URL de tu sitio
    );
});
