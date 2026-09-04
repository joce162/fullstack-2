document.addEventListener("DOMContentLoaded", () => {
    // 1. Obtener el ID del producto desde la URL (?id=GA001)
    const params = new URLSearchParams(window.location.search);
    const idProducto = params.get("id") || "GA001";

    // 2. Buscar el producto seleccionado en la lista global (definida en productos.js)
    const producto = listaProductos.find(p => p.id === idProducto) || listaProductos[0];

    // 3. Renderizar los detalles del producto principal si existen los elementos
    const imgElem = document.getElementById("prod-img");
    const catElem = document.getElementById("prod-cat");
    const nombreElem = document.getElementById("prod-nombre");
    const specsElem = document.getElementById("prod-specs");
    const precioElem = document.getElementById("prod-precio");
    const descElem = document.getElementById("prod-desc");

    if (imgElem) imgElem.src = producto.img;
    if (catElem) catElem.textContent = producto.categoria;
    if (nombreElem) nombreElem.textContent = producto.nombre;
    if (specsElem) specsElem.textContent = `Marca: ${producto.marca} | Modelo: ${producto.modelo}`;
    if (precioElem) precioElem.textContent = `$${producto.precio.toLocaleString('cl-CL')}`;
    if (descElem) descElem.textContent = producto.desc;

    // 4. Configurar el botón "Agregar al Carrito"
    const btnAgregar = document.getElementById("btn-add-detail");
    if (btnAgregar) {
        btnAgregar.addEventListener("click", () => {
            const inputCantidad = document.getElementById("prod-cantidad");
            const cantidad = inputCantidad ? parseInt(inputCantidad.value) || 1 : 1;
            
            // Función global de cart.js
            if (typeof agregarAlCarrito === "function") {
                agregarAlCarrito(producto.id, cantidad);
                alert(`¡Se agregaron ${cantidad} unidad(es) de "${producto.nombre}" al carrito!`);
            }
        });
    }

    // 5. RENDERIZAR RECOMENDACIONES (Productos Relacionados)
    const contenedorRecomendaciones = document.getElementById("contenedor-recomendaciones");
    if (contenedorRecomendaciones) {
        // Filtrar productos de la misma categoría excepto el actual
        let recomendados = listaProductos.filter(p => p.categoria === producto.categoria && p.id !== producto.id);

        // Si hay menos de 3, rellenar con otros productos
        if (recomendados.length < 3) {
            const otros = listaProductos.filter(p => p.id !== producto.id && !recomendados.includes(p));
            recomendados = recomendados.concat(otros);
        }

        // Tomar máximo 4 recomendaciones
        recomendados = recomendados.slice(0, 4);

        contenedorRecomendaciones.innerHTML = recomendados.map(prod => `
            <div class="col-6 col-md-3">
                <div class="card h-100 shadow-sm border-0">
                    <a href="producto-detalle.html?id=${prod.id}">
                        <img src="${prod.img}" class="card-img-top p-2" alt="${prod.nombre}" style="height: 150px; object-fit: contain;">
                    </a>
                    <div class="card-body d-flex flex-column p-2 text-center">
                        <h6 class="card-title fw-bold text-truncate" style="font-size: 0.9rem;">${prod.nombre}</h6>
                        <p class="text-warning fw-bold mb-2">$${prod.precio.toLocaleString('cl-CL')}</p>
                        <a href="producto-detalle.html?id=${prod.id}" class="btn btn-outline-warning btn-sm mt-auto fw-bold">
                            Ver Detalle
                        </a>
                    </div>
                </div>
            </div>
        `).join('');
    }
});