document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const idProducto = params.get("id");
    const productos = JSON.parse(localStorage.getItem("listaProductos")) || [];

    const producto = productos.find(p => p.id === idProducto) || productos[0];

    if (producto) {
        cargarDetalleProducto(producto);
        cargarRecomendaciones(productos, producto.id);
    }
});

function cargarDetalleProducto(prod) {
    const tieneStock = Number(prod.stock) > 0;

    // Actualización de elementos en la vista de detalle
    const elemNombre = document.getElementById("detalle-nombre");
    const elemPrecio = document.getElementById("detalle-precio");
    const elemDesc = document.getElementById("detalle-desc");
    const elemImg = document.getElementById("detalle-img");
    const elemStock = document.getElementById("detalle-stock");
    const btnAgregar = document.getElementById("btn-agregar-carrito");

    if (elemNombre) elemNombre.textContent = prod.nombre;
    if (elemPrecio) elemPrecio.textContent = `$${Number(prod.precio).toLocaleString('cl-CL')}`;
    if (elemDesc) elemDesc.textContent = prod.desc;
    if (elemImg) elemImg.src = prod.img;
    
    if (elemStock) {
        elemStock.textContent = tieneStock ? `Stock disponible: ${prod.stock}` : "Agotado";
        elemStock.className = tieneStock ? "badge bg-success mb-3" : "badge bg-danger mb-3";
    }

    if (btnAgregar) {
        if (tieneStock) {
            btnAgregar.disabled = false;
            btnAgregar.onclick = () => {
                const cantidadInput = document.getElementById("input-cantidad");
                const cantidad = cantidadInput ? parseInt(cantidadInput.value) || 1 : 1;
                
                if (typeof agregarAlCarrito === "function") {
                    agregarAlCarrito(prod.id, cantidad);
                    alert(`Se agregaron ${cantidad} unidad(es) al carrito.`);
                }
            };
        } else {
            btnAgregar.disabled = true;
            btnAgregar.textContent = "Sin Stock Disponible";
        }
    }
}

function cargarRecomendaciones(productos, idActual) {
    const contenedor = document.getElementById("contenedor-recomendaciones");
    if (!contenedor) return;

    const recomendados = productos.filter(p => p.id !== idActual).slice(0, 3);

    contenedor.innerHTML = recomendados.map(prod => `
        <div class="col-md-4">
            <div class="card h-100 border-0 shadow-sm">
                <img src="${prod.img}" class="card-img-top p-3" style="height: 180px; object-fit: contain;">
                <div class="card-body d-flex flex-column justify-content-between">
                    <h6 class="fw-bold">${prod.nombre}</h6>
                    <p class="fw-bold text-dark">$${Number(prod.precio).toLocaleString('cl-CL')}</p>
                    <a href="producto-detalle.html?id=${prod.id}" class="btn btn-outline-warning btn-sm fw-bold">Ver Detalles</a>
                </div>
            </div>
        </div>
    `).join('');
}