const button = document.getElementById("notifications");

button.addEventListener("click", () => {
    Notification.requestPermission().then((result) => {
        if (result === "granted") {
            randomNotification();
        }
    });
});

const datos = [
    { name: "¡Explora nuestra galería!", author: "Galería App", slug: "icono" },
    { name: "¡Mira nuestras nuevas imágenes!", author: "Galería App", slug: "icono" },
];

function randomNotification() {
    const randomItem = Math.floor(Math.random() * datos.length);
    const notiTitle = datos[randomItem].name;
    const notiBody = `Creado por ${datos[randomItem].author}`;
    const notiImg = `./img/${datos[randomItem].slug}.png`;

    const options = {
        body: notiBody,
        icon: notiImg,
    };

    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.ready.then((registration) => {
            registration.showNotification(notiTitle, options);
        });
    }

    setTimeout(randomNotification, 30000); // Notificación cada 30 segundos
}

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
