document.addEventListener("DOMContentLoaded", () => {
    // Verificar si existe sesión de administrador (o permitir acceso de prueba)
    const sesion = JSON.parse(localStorage.getItem("sesionAdmin"));
    if (!sesion || !sesion.logueado) {
        // Si se requiere seguridad estricta, redirige al login:
        // window.location.href = "login_admin.html";
    }

    renderizarTablaAdmin();

    document.getElementById("formProducto")?.addEventListener("submit", guardarProductoAdmin);
    document.getElementById("btnNuevoProducto")?.addEventListener("click", prepararModalCrear);
    document.getElementById("btnCerrarSesion")?.addEventListener("click", () => {
        localStorage.removeItem("sesionAdmin");
        window.location.href = "login_admin.html";
    });
});

function obtenerProductosStorage() {
    return JSON.parse(localStorage.getItem("listaProductos")) || [];
}

function guardarProductosStorage(lista) {
    localStorage.setItem("listaProductos", JSON.stringify(lista));
}

function renderizarTablaAdmin() {
    const tbody = document.getElementById("tablaProductosAdmin");
    if (!tbody) return;

    const productos = obtenerProductosStorage();

    // Actualizar KPIs
    document.getElementById("totalProductos").innerText = productos.length;
    document.getElementById("totalStock").innerText = productos.reduce((acc, p) => acc + Number(p.stock), 0);
    const categorias = new Set(productos.map(p => p.categoria));
    document.getElementById("totalCategorias").innerText = categorias.size;

    if (productos.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-muted">No hay productos registrados.</td></tr>`;
        return;
    }

    tbody.innerHTML = productos.map(prod => `
        <tr>
            <td><strong>${prod.id}</strong></td>
            <td>
                <div class="d-flex align-items-center gap-2">
                    <img src="${prod.img}" style="width: 40px; height: 40px; object-fit: contain;">
                    <div>
                        <div class="fw-bold">${prod.nombre}</div>
                        <small class="text-muted">${prod.marca || ''}</small>
                    </div>
                </div>
            </td>
            <td><span class="badge bg-secondary">${prod.categoria}</span></td>
            <td class="fw-bold text-warning">$${Number(prod.precio).toLocaleString('cl-CL')}</td>
            <td>
                ${prod.stock > 0 
                    ? `<span class="badge bg-success">Stock: ${prod.stock}</span>` 
                    : `<span class="badge bg-danger">Sin Stock</span>`
                }
            </td>
            <td>
                <button class="btn btn-warning btn-sm me-1" onclick="prepararModalEditar('${prod.id}')">
                    <i class="bi bi-pencil"></i> Editar
                </button>
                <button class="btn btn-danger btn-sm" onclick="eliminarProductoAdmin('${prod.id}')">
                    <i class="bi bi-trash"></i> Eliminar
                </button>
            </td>
        </tr>
    `).join('');
}

function prepararModalCrear() {
    document.getElementById("tituloModalProducto").innerText = "Nuevo Producto";
    document.getElementById("prodIdHidden").value = "";
    document.getElementById("formProducto").reset();
}

function prepararModalEditar(id) {
    const productos = obtenerProductosStorage();
    const prod = productos.find(p => p.id === id);
    if (!prod) return;

    document.getElementById("tituloModalProducto").innerText = "Editar Producto";
    document.getElementById("prodIdHidden").value = prod.id;
    document.getElementById("nombreProducto").value = prod.nombre;
    document.getElementById("categoriaProducto").value = prod.categoria;
    document.getElementById("marcaProducto").value = prod.marca || "";
    document.getElementById("precioProducto").value = prod.precio;
    document.getElementById("stockProducto").value = prod.stock;
    document.getElementById("descProducto").value = prod.desc || "";
    document.getElementById("imagenProducto").value = prod.img;

    const modal = new bootstrap.Modal(document.getElementById("modalProducto"));
    modal.show();
}

function guardarProductoAdmin(e) {
    e.preventDefault();

    let productos = obtenerProductosStorage();
    const idHidden = document.getElementById("prodIdHidden").value;

    const nuevoProd = {
        id: idHidden || "PROD-" + Date.now().toString().slice(-4),
        nombre: document.getElementById("nombreProducto").value,
        categoria: document.getElementById("categoriaProducto").value,
        marca: document.getElementById("marcaProducto").value,
        precio: parseFloat(document.getElementById("precioProducto").value),
        stock: parseInt(document.getElementById("stockProducto").value),
        desc: document.getElementById("descProducto").value,
        img: document.getElementById("imagenProducto").value
    };

    if (idHidden) {
        // Editar
        productos = productos.map(p => p.id === idHidden ? nuevoProd : p);
    } else {
        // Crear
        productos.push(nuevoProd);
    }

    guardarProductosStorage(productos);
    renderizarTablaAdmin();

    const modalElement = document.getElementById("modalProducto");
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal?.hide();
}

function eliminarProductoAdmin(id) {
    if (!confirm("¿Seguro que deseas eliminar este producto del inventario?")) return;

    let productos = obtenerProductosStorage();
    productos = productos.filter(p => p.id !== id);

    // Si estaba en el carrito, se limpia también
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito = carrito.filter(item => item.id !== id);

    localStorage.setItem("carrito", JSON.stringify(carrito));
    guardarProductosStorage(productos);
    renderizarTablaAdmin();
}