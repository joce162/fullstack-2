
const listaProductos = [
    { id: "GA001", categoria: "Guitarras Acústicas", nombre: "Guitarra Acústica Folk", marca: "Yamaha", modelo: "F310", precio: 129990, desc: "Tapa de abeto, aros y fondo de meranti. Ideal para iniciantes.", img: "https://cdnx.jumpseller.com/audiomarket-pro/image/66514656/resize/2157/2157?1755227257" },
    { id: "GA002", categoria: "Guitarras Acústicas", nombre: "Guitarra Acústica Dreadnought", marca: "Fender", modelo: "CD-60S", precio: 189990, desc: "Tapa de abeto macizo, brazo de caoba.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1C4Es2L_D5LPKHaCwmf6jEfsxBahD1N2SrZWEwyofog&s=10" },
    { id: "GA003", categoria: "Guitarras Acústicas", nombre: "Guitarra Acústica Clásica 4/4", marca: "Yamaha", modelo: "C40", precio: 89990, desc: "Nailon, tapa de abeto. Ideal para estudio.", img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRAjD5iST1IvEMLo-E0zm4tytUqnIeQj_NkHFSuvgQQFI0xENHfSbLa7TV12L96PugiluWJlLkj4rZkLjDHC5zgfya5kRyWxehYTsfMlIBmmDyUNN2ntSFF" },
    { id: "GA004", categoria: "Guitarras Acústicas", nombre: "Guitarra Electroacústica", marca: "Takamine", modelo: "GN20CE", precio: 349990, desc: "Pickup integrado, afinador incorporado.", img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRH_F5kMC7951b8lWmfgIBFDCkmF2HFfvty76z6SkpJtvPRWV52Ok8TiRwXNX9cq-1cCkRITNc7JxFKtRLUuFw5nqlLgONzzs7Tb_bocp4U6iM_SwaVfYmx" },
    { id: "GE001", categoria: "Guitarras Eléctricas", nombre: "Guitarra Eléctrica Stratocaster", marca: "Squier", modelo: "Affinity Strat", precio: 249990, desc: "Cuerpo de álamo, mástil de arce.", img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQaqb3GKOB09v5uDzuFVbRRns8-WgFSxSSw6JCU4ow06fwkv0ObY-oHUXGtCq4KenZy6Xow82uTmw6hMCIl16MdvHhprNbGqJRUIAKrWJKALVLng2DqZQzTKg" },
    { id: "GE002", categoria: "Guitarras Eléctricas", nombre: "Guitarra Eléctrica Les Paul", marca: "Epiphone", modelo: "Les Paul Std", precio: 329990, desc: "Cuerpo caoba, tapa arce, pastillas humbucker.", img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT2VRGcs4gyhy0sUb4Tuu4bm-xLpCWFJlT-VrS_MacJEra7gCWcVRm9jjkNcuMUVNIbskEnaCMY8riZny3YIOLcBuY44sA_0H_lPUttLICkXFIr_DLJY-5q" },
    { id: "BA001", categoria: "Bajos Eléctricos", nombre: "Bajo Eléctrico 4 Cuerdas", marca: "Squier", modelo: "Affinity PJ", precio: 299990, desc: "Pickup PJ, cuerpo álamo, mástil arce.", img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR9fCytX8Saw2k1OaVICW-1PAB0pn2_KNdElfjs6xLIjq6txncekdtsbgJenkKkXGEIbq5joAz4nF65rsJuAJEDGwgDggaw8ASBv5-hUwW4ASGYLBbXEH-r7w" },
    { id: "BA002", categoria: "Bajos Eléctricos", nombre: "Bajo Eléctrico Jazz Bass", marca: "Fender", modelo: "Player Jazz", precio: 699990, desc: "Alder body, 2 Alnico V Jazz single-coil.", img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTydNuFdVdCK2ur6MtAioY_0LWx1CEAsk5JnIUX1nIu1C1swOqkswpfG2HLzV4xkhgAorjm7r5xkP0QwkXX1ubm0TRDUqPHBjeyIHZ8Hf1XyTfjqgB0v1e9" }
];

document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("contenedor-productos");
    if (!contenedor) return;

    contenedor.innerHTML = listaProductos.map(prod => `
        <div class="col-md-4 col-lg-3">
            <div class="card h-100 shadow-sm border-0">
                <a href="producto-detalle.html?id=${prod.id}">
                    <img src="${prod.img}" class="card-img-top p-3" alt="${prod.nombre}" style="height: 200px; object-fit: contain;">
                </a>
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
