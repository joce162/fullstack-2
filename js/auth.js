document.addEventListener("DOMContentLoaded", () => {
    actualizarBarraNavegacion();
});

function actualizarBarraNavegacion() {
    // Leemos si hay sesión activa guardada en localStorage
    const sesionAdmin = JSON.parse(localStorage.getItem("sesionAdmin"));

    // Buscamos el contenedor del Navbar donde están los botones "Iniciar Sesión" y "Registrarse"
    // (Asegúrate de que tus botones en el HTML estén dentro de un div o tengan una clase/contenedor fácil de identificar)
    const contenedorBotones = document.querySelector(".navbar .d-flex") || document.querySelector("nav .d-flex");

    if (contenedorBotones && sesionAdmin && sesionAdmin.logueado) {
        // Reemplazamos los botones normales por los de Administrador Activo
        contenedorBotones.innerHTML = `
            <div class="dropdown">
                <button class="btn btn-warning btn-sm fw-bold dropdown-toggle text-dark" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    👤 Admin: ${sesionAdmin.usuario.split('@')[0]}
                </button>
                <ul class="dropdown-menu dropdown-menu-end shadow">
                    <li><a class="dropdown-item fw-bold text-dark" href="admin.html">⚙️ Panel de Gestión</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><button class="dropdown-item text-danger fw-bold" id="btnCerrarSesionGlobal">🚪 Cerrar Sesión</button></li>
                </ul>
            </div>
        `;

        // Evento para cerrar sesión
        document.getElementById("btnCerrarSesionGlobal")?.addEventListener("click", () => {
            localStorage.removeItem("sesionAdmin");
            window.location.reload(); // Recarga la página para volver al estado normal
        });
    }
}