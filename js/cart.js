function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito_sonidos")) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito_sonidos", JSON.stringify(carrito));
    actualizarBadgeCarrito();
}

function agregarAlCarrito(idProducto, cantidad = 1) {
    let carrito = obtenerCarrito();
    const productosBD = JSON.parse(localStorage.getItem("listaProductos")) || [];
    
    // Buscar el producto en la base de datos local
    const productoInfo = productosBD.find(p => String(p.id) === String(idProducto));

    if (!productoInfo) {
        alert("Error al intentar agregar el producto.");
        return;
    }

    const stockMaximo = Number(productoInfo.stock) || 0;
    const itemExistente = carrito.find(item => String(item.id) === String(idProducto));
    const cantidadEnCarrito = itemExistente ? itemExistente.cantidad : 0;

    // Control estricto de Stock
    if (cantidadEnCarrito + cantidad > stockMaximo) {
        alert(`No puedes agregar más unidades. El stock disponible es ${stockMaximo}.`);
        return;
    }

    if (itemExistente) {
        itemExistente.cantidad += cantidad;
    } else {
        carrito.push({
            id: productoInfo.id,
            nombre: productoInfo.nombre,
            precio: productoInfo.precio,
            imagen: productoInfo.img || productoInfo.imagen || 'https://via.placeholder.com/150',
            cantidad: cantidad
        });
    }

    guardarCarrito(carrito);
    alert(`¡Se agregaron ${cantidad} unidad(es) al carrito!`);
}

function actualizarCantidadCarrito(idProducto, cambio) {
    let carrito = obtenerCarrito();
    const productosBD = JSON.parse(localStorage.getItem("listaProductos")) || [];
    const productoInfo = productosBD.find(p => String(p.id) === String(idProducto));
    const item = carrito.find(p => String(p.id) === String(idProducto));

    if (item) {
        const nuevaCantidad = item.cantidad + cambio;
        
        if (productoInfo && nuevaCantidad > productoInfo.stock) {
            alert(`Stock máximo alcanzado (${productoInfo.stock} disponibles).`);
            return;
        }

        item.cantidad = nuevaCantidad;
        if (item.cantidad <= 0) {
            carrito = carrito.filter(p => String(p.id) !== String(idProducto));
        }
    }

    guardarCarrito(carrito);
    if (typeof renderizarPaginaCarrito === "function") {
        renderizarPaginaCarrito();
    }
}

function eliminarDelCarrito(idProducto) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(p => String(p.id) !== String(idProducto));
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

function finalizarCompra() {
    const carrito = obtenerCarrito();
    let productosBD = JSON.parse(localStorage.getItem("listaProductos")) || [];

    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    // Descontar las unidades compradas del stock global
    carrito.forEach(itemCarrito => {
        const prodIndex = productosBD.findIndex(p => String(p.id) === String(itemCarrito.id));
        if (prodIndex !== -1) {
            const nuevoStock = productosBD[prodIndex].stock - itemCarrito.cantidad;
            productosBD[prodIndex].stock = nuevoStock < 0 ? 0 : nuevoStock;
        }
    });

    // Guardar cambios y vaciar carrito
    localStorage.setItem("listaProductos", JSON.stringify(productosBD));
    vaciarCarrito();

    alert("¡Compra realizada con éxito! El stock ha sido actualizado.");
    window.location.href = "productos.html";
}

document.addEventListener("DOMContentLoaded", () => {
    actualizarBadgeCarrito();
});