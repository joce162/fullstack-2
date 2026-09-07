document.addEventListener("DOMContentLoaded", () => {
    inicializarCatalogoAdmin();
    renderizarCatalogoTienda();
});

function inicializarCatalogoAdmin() {
    const productosIniciales = [
        {
            id: "GA001",
            nombre: "Guitarra Acústica Folk",
            categoria: "Guitarras Acústicas",
            marca: "Yamaha",
            modelo: "F310",
            precio: 129990,
            stock: 5,
            desc: "Tapa de abeto, aros y fondo de meranti.",
            img: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&q=80"
        },
        {
            id: "GE001",
            nombre: "Guitarra Eléctrica Stratocaster",
            categoria: "Guitarras Eléctricas",
            marca: "Fender / Squier",
            modelo: "Bullet Strat",
            precio: 249990,
            stock: 8,
            desc: "Cuerpo de álamo, mástil de arce en C y 3 cápsulas single-coil.",
            img: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=500&q=80"
        },
        {
            id: "BE001",
            nombre: "Bajo Eléctrico 4 Cuerdas",
            categoria: "Bajos",
            marca: "Ibanez",
            modelo: "GSR200",
            precio: 219990,
            stock: 4,
            desc: "Bajo eléctrico activo con excelente respuesta.",
            img: "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=500&q=80"
        },
        {
            id: "GA002",
            nombre: "Guitarra Acústica Clásica 4/4",
            categoria: "Guitarras Acústicas",
            marca: "Yamaha",
            modelo: "C40",
            precio: 89990,
            stock: 3,
            desc: "Cuerdas de nailon, tapa de abeto. Ideal para estudio.",
            img: "https://images.unsplash.com/photo-1550291652-6ea9114a47b1?w=500&q=80"
        },
        {
            id: "GE002",
            nombre: "Guitarra Eléctrica Les Paul",
            categoria: "Guitarras Eléctricas",
            marca: "Epiphone",
            modelo: "Standard 60s",
            precio: 389990,
            stock: 6,
            desc: "Cuerpo de caoba con tapa de arce y cápsulas Humbucker.",
            img: "https://images.unsplash.com/photo-1550985616-10810253b84d?w=500&q=80"
        },
        {
            id: "BE002",
            nombre: "Bajo Eléctrico Jazz Bass 5 Cuerdas",
            categoria: "Bajos",
            marca: "Squier",
            modelo: "Classic Vibe 70s",
            precio: 429990,
            stock: 2,
            desc: "Bajo de 5 cuerdas con cápsulas alnico.",
            img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80"
        }
    ];

    // Forzar actualización si no hay productos o hay menos de 6
    const listaExistente = JSON.parse(localStorage.getItem("listaProductos")) || [];
    if (listaExistente.length < 6) {
        localStorage.setItem("listaProductos", JSON.stringify(productosIniciales));
    }
}

function renderizarCatalogoTienda() {
    const contenedor = document.getElementById("contenedor-productos");
    
    // Si no encuentra el contenedor en el HTML, avisa en la consola
    if (!contenedor) {
        console.error("ERROR: No se encontró el elemento con id='contenedor-productos' en tu HTML.");
        return;
    }

    const productosBD = JSON.parse(localStorage.getItem("listaProductos")) || [];

    if (productosBD.length === 0) {
        contenedor.innerHTML = `<div class="col-12 text-center text-muted py-5"><h4>No hay productos en inventario.</h4></div>`;
        return;
    }

    contenedor.innerHTML = productosBD.map(prod => {
        const stockActual = Number(prod.stock) || 0;
        const tieneStock = stockActual > 0;

        return `
            <div class="col-12 col-sm-6 col-lg-4 d-flex align-items-stretch mb-4">
                <div class="card border-0 shadow-sm w-100 position-relative rounded-3 overflow-hidden d-flex flex-column">
                    <span class="badge position-absolute top-0 start-0 m-3 px-3 py-2 ${tieneStock ? 'bg-dark text-warning' : 'bg-danger text-white'}">
                        ${tieneStock ? `Stock: ${stockActual}` : 'Agotado'}
                    </span>
                    
                    <div class="p-3 text-center bg-white" style="height: 220px;">
                        <img src="${prod.img || prod.imagen}" alt="${prod.nombre}" class="img-fluid h-100" style="object-fit: contain;">
                    </div>
                    
                    <div class="card-body d-flex flex-column justify-content-between p-4 bg-white">
                        <div>
                            <span class="badge bg-secondary mb-2">${prod.categoria || 'General'}</span>
                            <h5 class="fw-bold text-dark mb-1">${prod.nombre}</h5>
                            <p class="text-muted small mb-2">Marca: ${prod.marca || 'N/A'}</p>
                            <h4 class="fw-bold text-dark mb-3">$${Number(prod.precio).toLocaleString('cl-CL')}</h4>
                        </div>
                        
                        <div>
                            ${tieneStock 
                                ? `<a href="producto-detalle.html?id=${prod.id}" class="btn btn-warning w-100 fw-bold text-dark py-2">
                                     Ver Producto
                                   </a>` 
                                : `<button class="btn btn-secondary w-100 fw-bold py-2" disabled>
                                     <i class="bi bi-slash-circle me-1"></i> Sin Stock
                                   </button>`
                            }
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}