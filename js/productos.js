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
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7psVx0JqDxN1FKRbEQtECoEiFQeUAWLbhJtgpEAhQ-A&s"
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
            img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTZ-U3LBwT79j-xK146Z35pWLvBWFlUoXniOzVN0MqN3qBFJoyW9IP-p09fkSIDYPDqsXhoz0rG5rMSZNrzVWUfcj4x2DUcvPijUxKd1Yk1SqkQZitGWwokDA"
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
            img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSxufvLS_RMkflcy8LPvHQ2nr7UIfVd1RUUl2J4F3zq3_g9oOaEXuXsx8sXNqN-2AwgVhI5ULgZcekIzkNTP_sPKAYAc4_v"
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
            img: "https://i5.walmartimages.cl/asr/46ddc09e-2e2a-49bc-92bb-17d94211e228.8cc53d9167db48aa2df7de90365df567.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF"
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
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCROIjcyoYghhK9n3zb9KQJrC-BS0ahz0lnPCaH8ViqA&s=10"
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
            img: "https://www.fender.cl/media/catalog/product/cache/1/image/800x800/9df78eab33525d08d6e5fb8d27136e95/b/1/b186_0374550506v1.jpg"
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