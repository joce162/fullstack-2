


function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito_sonidos")) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito_sonidos", JSON.stringify(carrito));
    actualizarBadgeCarrito();
}

function agregarAlCarrito(idProducto, cantidad = 1) {
    let carrito = obtenerCarrito();
    const itemExistente = carrito.find(item => item.id === idProducto);

    if (itemExistente) {
        itemExistente.cantidad += cantidad;
    } else {
    
        let productoInfo = (typeof productosBD !== 'undefined') 
            ? productosBD.find(p => p.id === idProducto) 
            : null;

        if (!productoInfo && typeof listaProductos !== 'undefined') {
            productoInfo = listaProductos.find(p => p.id === idProducto);
        }

        if (productoInfo) {
            carrito.push({
                id: productoInfo.id,
                nombre: productoInfo.nombre,
                precio: productoInfo.precio,
                imagen: productoInfo.img || 'https://via.placeholder.com/150',
                cantidad: cantidad
            });
        }
    }

    guardarCarrito(carrito);
}

function actualizarCantidadCarrito(idProducto, cambio) {
    let carrito = obtenerCarrito();
    const item = carrito.find(p => p.id === idProducto);

    if (item) {
        item.cantidad += cambio;
        if (item.cantidad <= 0) {
            carrito = carrito.filter(p => p.id !== idProducto);
        }
    }

    guardarCarrito(carrito);
    if (typeof renderizarPaginaCarrito === "function") {
        renderizarPaginaCarrito();
    }
}

function eliminarDelCarrito(idProducto) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(p => p.id !== idProducto);
    guardarCarrito(carrito);
    if (typeof renderizarPaginaCarrito === "function") {
        renderizarPaginaCarrito();
    }
}

function vaciarCarrito() {
    localStorage.removeItem("carrito_sonidos");
    actualizarBadgeCarrito();
    if (typeof renderizarPaginaCarrito === "function") {
        renderizarPaginaCarrito();
    }
}

function actualizarBadgeCarrito() {
    const carrito = obtenerCarrito();
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const badges = document.querySelectorAll("#cart-badge");
    badges.forEach(badge => {
        badge.textContent = totalItems;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    actualizarBadgeCarrito();
});