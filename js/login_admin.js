document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const correoInput = document.getElementById("correo");
    const passwordInput = document.getElementById("password");
    const errorCorreo = document.getElementById("error-correo");
    const errorPassword = document.getElementById("error-password");
    const togglePasswordBtn = document.getElementById("togglePassword");

    // Botón para mostrar / ocultar contraseña
    togglePasswordBtn?.addEventListener("click", () => {
        const isPassword = passwordInput.type === "password";
        passwordInput.type = isPassword ? "text" : "password";
        
        const eyeOn = togglePasswordBtn.querySelector(".icon-eye");
        const eyeOff = togglePasswordBtn.querySelector(".icon-eye-off");
        
        if (eyeOn && eyeOff) {
            eyeOn.hidden = isPassword;
            eyeOff.hidden = !isPassword;
        }
    });

    // Envío del Formulario
    loginForm?.addEventListener("submit", (e) => {
        e.preventDefault();

        // Limpiar errores previos
        errorCorreo.innerText = "";
        errorPassword.innerText = "";

        const correo = correoInput.value.trim();
        const password = passwordInput.value.trim();

        let valido = true;

        if (!correo) {
            errorCorreo.innerText = "Ingresa tu correo de administrador.";
            valido = false;
        }

        if (!password) {
            errorPassword.innerText = "Ingresa tu contraseña.";
            valido = false;
        }

        if (!valido) return;

        // Credenciales de prueba
        if (correo === "admin@admin.cl" && password === "1234") {
            const sesionAdmin = {
                usuario: correo,
                rol: "admin",
                logueado: true
            };
            localStorage.setItem("sesionAdmin", JSON.stringify(sesionAdmin));
            window.location.href = "admin.html";
        } else {
            errorPassword.innerText = "Credenciales incorrectas (Usa: admin@admin.cl / 1234)";
        }
    });
});