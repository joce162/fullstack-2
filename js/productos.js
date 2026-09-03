// Catálogo extraído de tu Excel de Evaluación
const listaProductos = [
    { id: "GA001", categoria: "Guitarras Acústicas", nombre: "Guitarra Acústica Folk", marca: "Yamaha", modelo: "F310", precio: 129990, desc: "Tapa de abeto, aros y fondo de meranti. Ideal para iniciantes.", img: "https://via.placeholder.com/300x200?text=Yamaha+F310" },
    { id: "GA002", categoria: "Guitarras Acústicas", nombre: "Guitarra Acústica Dreadnought", marca: "Fender", modelo: "CD-60S", precio: 189990, desc: "Tapa de abeto macizo, brazo de caoba.", img: "https://via.placeholder.com/300x200?text=Fender+CD-60S" },
    { id: "GA003", categoria: "Guitarras Acústicas", nombre: "Guitarra Acústica Clásica 4/4", marca: "Yamaha", modelo: "C40", precio: 89990, desc: "Nailon, tapa de abeto. Ideal para estudio.", img: "https://via.placeholder.com/300x200?text=Yamaha+C40" },
    { id: "GA004", categoria: "Guitarras Acústicas", nombre: "Guitarra Electroacústica", marca: "Takamine", modelo: "GN20CE", precio: 349990, desc: "Pickup integrado, afinador incorporado.", img: "https://via.placeholder.com/300x200?text=Takamine+GN20CE" },
    { id: "GE001", categoria: "Guitarras Eléctricas", nombre: "Guitarra Eléctrica Stratocaster", marca: "Squier", modelo: "Affinity Strat", precio: 249990, desc: "Cuerpo de álamo, mástil de arce.", img: "https://via.placeholder.com/300x200?text=Squier+Strat" },
    { id: "GE002", categoria: "Guitarras Eléctricas", nombre: "Guitarra Eléctrica Les Paul", marca: "Epiphone", modelo: "Les Paul Std", precio: 329990, desc: "Cuerpo caoba, tapa arce, pastillas humbucker.", img: "https://via.placeholder.com/300x200?text=Epiphone+Les+Paul" },
    { id: "BA001", categoria: "Bajos Eléctricos", nombre: "Bajo Eléctrico 4 Cuerdas", marca: "Squier", modelo: "Affinity PJ", precio: 299990, desc: "Pickup PJ, cuerpo álamo, mástil arce.", img: "https://via.placeholder.com/300x200?text=Squier+Bajo+PJ" },
    { id: "BA002", categoria: "Bajos Eléctricos", nombre: "Bajo Eléctrico Jazz Bass", marca: "Fender", modelo: "Player Jazz", precio: 699990, desc: "Alder body, 2 Alnico V Jazz single-coil.", img: "https://via.placeholder.com/300x200?text=Fender+Jazz+Bass" }
];

document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("contenedor-productos");
    if (!contenedor) return;

    // Genera automáticamente cada tarjeta en la página productos.html
    contenedor.innerHTML = listaProductos.map(prod => `
        <div class="col-md-4 col-lg-3">
            <div class="card h-100 shadow-sm border-0">
                <img src="${prod.img}" class="card-img-top p-3" alt="${prod.nombre}">
                <div class="card-body d-flex flex-column">
                    <span class="badge bg-secondary mb-2 align-self-start">${prod.categoria}</span>
                    <h5 class="card-title fs-6 fw-bold">${prod.nombre}</h5>
                    <p class="card-text text-muted small">${prod.marca} - ${prod.modelo}</p>
                    <p class="text-warning fw-bold fs-5 mt-auto">$${prod.precio.toLocaleString('cl-CL')}</p>
                    <a href="producto-detalle.html?id=${prod.id}" class="btn btn-warning fw-bold w-100">
                        Ver Producto
                    </a>
                </div>
            </div>
        </div>
    `).join('');
});