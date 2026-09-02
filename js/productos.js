// js/productos.js

function agregarAlCarrito(id, nombre, precio, imagen) {
    let carrito = obtenerCarrito();
    const index = carrito.findIndex(item => item.id === id);

    if (index !== -1) {
        carrito[index].cantidad += 1;
    } else {
        carrito.push({ id, nombre, precio, imagen, cantidad: 1 });
    }

    guardarCarrito(carrito);
    renderizarCarritoOffcanvas();

    // Abrir automáticamente el Offcanvas del carrito al agregar
    const offcanvasElement = document.getElementById('offcanvasCart');
    if (offcanvasElement) {
        const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);
        bsOffcanvas.show();
    }
}

function cambiarCantidad(id, cambio) {
    let carrito = obtenerCarrito();
    const index = carrito.findIndex(item => item.id === id);

    if (index !== -1) {
        carrito[index].cantidad += cambio;
        if (carrito[index].cantidad <= 0) {
            carrito.splice(index, 1);
        }
        guardarCarrito(carrito);
        renderizarCarritoOffcanvas();
    }
}

function eliminarDelCarrito(id) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(item => item.id !== id);
    guardarCarrito(carrito);
    renderizarCarritoOffcanvas();
}

function renderizarCarritoOffcanvas() {
    const container = document.getElementById('cart-items-container');
    const totalElement = document.getElementById('cart-total-price');
    const carrito = obtenerCarrito();

    if (container) {
        if (carrito.length === 0) {
            container.innerHTML = '<p class="text-center text-muted my-4">El carrito está vacío</p>';
        } else {
            container.innerHTML = carrito.map(item => `
                <div class="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                    <img src="${item.imagen}" width="50" height="50" class="rounded object-fit-cover me-2" alt="${item.nombre}">
                    <div class="flex-grow-1">
                        <h6 class="mb-0 text-truncate" style="max-width: 130px;">${item.nombre}</h6>
                        <small class="text-muted">$${item.precio} x ${item.cantidad}</small>
                    </div>
                    <div class="d-flex align-items-center">
                        <button class="btn btn-sm btn-outline-secondary px-2" onclick="cambiarCantidad(${item.id}, -1)">-</button>
                        <span class="mx-2 fw-bold">${item.cantidad}</span>
                        <button class="btn btn-sm btn-outline-secondary px-2" onclick="cambiarCantidad(${item.id}, 1)">+</button>
                        <button class="btn btn-sm btn-danger ms-2" onclick="eliminarDelCarrito(${item.id})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }

    if (totalElement) {
        const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        totalElement.textContent = `$${total.toFixed(2)}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderizarCarritoOffcanvas();
});