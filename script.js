// Selección del botón para notificaciones
const button = document.getElementById("notifications");

// Evento para solicitar permisos de notificaciones
button.addEventListener("click", () => {
    Notification.requestPermission().then((result) => {
        if (result === "granted") {
            sendNotification();
        } else {
            console.log("Permiso denegado");
        }
    });
});

// Función para enviar una notificación
function sendNotification() {
    const options = {
        body: "Explora nuestra galería de imágenes ahora.",
        icon: "./img/img1.jpg",
    };

    // Comprobar si el Service Worker está listo
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.ready.then((registration) => {
            registration.showNotification("Galería de Imágenes", options);
        });
    } else {
        console.error("Service Worker no está disponible.");
    }
}

// Registrar el Service Worker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("./sw.js")
        .then((registration) => {
            console.log("Service Worker registrado:", registration);
        })
        .catch((error) => {
            console.error("Error al registrar el Service Worker:", error);
        });
}
