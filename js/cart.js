// js/cart.js

// Obtener carrito de localStorage o inicializar vacío
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito_sonidos')) || [];
}

// Guardar carrito en localStorage
function guardarCarrito(carrito) {
    localStorage.setItem('carrito_sonidos', JSON.stringify(carrito));
    actualizarBadges();
}

// Actualizar el número de items en el badge de la barra de navegación
function actualizarBadges() {
    const carrito = obtenerCarrito();
    const totalProductos = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const badges = document.querySelectorAll('#cart-badge');
    
    badges.forEach(badge => {
        if (badge) {
            badge.textContent = totalProductos;
        }
    });
}

// Al cargar cualquier página, actualizar los badges automáticamente
document.addEventListener('DOMContentLoaded', () => {
    actualizarBadges();
});