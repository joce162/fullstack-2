// js/home.js

document.addEventListener('DOMContentLoaded', () => {
    // Inicialización explícita del carrusel de Bootstrap
    const carouselEl = document.querySelector('#heroCarousel');
    if (carouselEl) {
        new bootstrap.Carousel(carouselEl, {
            interval: 4000,
            ride: 'carousel'
        });
    }
});