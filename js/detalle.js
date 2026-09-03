// Base de datos representativa extraída del Excel de Evaluación
const productosBD = [
    { id: "GA001", categoria: "Guitarras Acústicas", nombre: "Guitarra Acústica Folk", marca: "Yamaha", modelo: "F310", stock: 8, precio: 129990, desc: "Tapa de abeto, aros y fondo de meranti. Ideal para iniciantes.", img: "https://via.placeholder.com/400x400?text=Yamaha+F310" },
    { id: "GA002", categoria: "Guitarras Acústicas", nombre: "Guitarra Acústica Dreadnought", marca: "Fender", modelo: "CD-60S", stock: 5, precio: 189990, desc: "Tapa de abeto macizo, brazo de caoba. Sonido cálido y proyectado.", img: "https://via.placeholder.com/400x400?text=Fender+CD-60S" },
    { id: "GA003", categoria: "Guitarras Acústicas", nombre: "Guitarra Acústica Clásica 4/4", marca: "Yamaha", modelo: "C40", stock: 10, precio: 89990, desc: "Nailon, tapa de abeto. Ideal para estudio y flamenco.", img: "https://via.placeholder.com/400x400?text=Yamaha+C40" },
    { id: "GE001", categoria: "Guitarras Eléctricas", nombre: "Guitarra Eléctrica Stratocaster", marca: "Squier", modelo: "Affinity Strat", stock: 5, precio: 249990, desc: "Cuerpo de álamo, mástil de arce, pastillas SSS.", img: "https://via.placeholder.com/400x400?text=Squier+Strat" },
    { id: "GE002", categoria: "Guitarras Eléctricas", nombre: "Guitarra Eléctrica Les Paul", marca: "Epiphone", modelo: "Les Paul Std", stock: 4, precio: 329990, desc: "Cuerpo caoba, tapa arce, pastillas humbucker.", img: "https://via.placeholder.com/400x400?text=Epiphone+Les+Paul" },
    { id: "BA001", categoria: "Bajos Eléctricos", nombre: "Bajo Eléctrico 4 Cuerdas", marca: "Squier", modelo: "Affinity PJ", stock: 5, precio: 299990, desc: "Pickup PJ, cuerpo álamo, mástil arce.", img: "https://via.placeholder.com/400x400?text=Squier+Bajo+PJ" }
];

document.addEventListener("DOMContentLoaded", () => {
    // Obtener ID del producto desde los parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const prodId = urlParams.get('id') || 'GA001';

    // Buscar producto en la BD
    const producto = productosBD.find(p => p.id === prodId) || productosBD[0];

    // Cargar datos en el HTML
    document.getElementById("bc-producto").textContent = producto.nombre;
    document.getElementById("prod-nombre").textContent = producto.nombre;
    document.getElementById("prod-categoria").textContent = producto.categoria;
    document.getElementById("prod-marca").textContent = producto.marca;
    document.getElementById("prod-modelo").textContent = producto.modelo;
    document.getElementById("prod-precio").textContent = `$${producto.precio.toLocaleString('cl-CL')}`;
    document.getElementById("prod-descripcion").textContent = producto.desc;
    document.getElementById("prod-stock").textContent = producto.stock;
    document.getElementById("prod-img-principal").src = producto.img;

    // Botón añadir al carrito
    document.getElementById("btn-agregar-detalle").addEventListener("click", () => {
        const cant = parseInt(document.getElementById("prod-cantidad").value) || 1;
        if (typeof agregarAlCarrito === "function") {
            agregarAlCarrito(producto.id, cant);
            alert(`¡Se agregaron ${cant} unidad(es) de ${producto.nombre} al carrito!`);
        }
    });

    // Cargar Productos Relacionados
    const relCont = document.getElementById("relacionados-container");
    const relacionados = productosBD.filter(p => p.id !== producto.id).slice(0, 4);

    relCont.innerHTML = relacionados.map(rel => `
        <div class="col">
            <div class="card h-100 shadow-sm border-0">
                <img src="${rel.img}" class="card-img-top p-3" alt="${rel.nombre}">
                <div class="card-body d-flex flex-column">
                    <h6 class="card-title fw-bold">${rel.nombre}</h6>
                    <p class="text-warning fw-bold mt-auto">$${rel.precio.toLocaleString('cl-CL')}</p>
                    <a href="producto-detalle.html?id=${rel.id}" class="btn btn-outline-dark btn-sm w-100">Ver producto</a>
                </div>
            </div>
        </div>
    `).join('');
});