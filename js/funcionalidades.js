document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const correoInput = document.getElementById('correo');
  const passwordInput = document.getElementById('password');
  const togglePassword = document.getElementById('togglePassword');
  const btnSubmit = document.getElementById('btnSubmit');

  const errorCorreo = document.getElementById('error-correo');
  const errorPassword = document.getElementById('error-password');
  const errorGeneral = document.getElementById('error-general');

  // Dominios permitidos según la rúbrica de la evaluación
  const DOMINIOS_PERMITIDOS = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com'];
  const REGEX_CORREO = /^[^\s@]+@([^\s@]+\.[^\s@]+)$/;

  // Mostrar / ocultar contraseña
  togglePassword.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';

    togglePassword.setAttribute('aria-pressed', String(isPassword));
    togglePassword.setAttribute('aria-label', isPassword ? 'Ocultar contraseña' : 'Mostrar contraseña');
    togglePassword.querySelector('.icon-eye').hidden = isPassword;
    togglePassword.querySelector('.icon-eye-off').hidden = !isPassword;
  });

  function limpiarError(input, span) {
    input.classList.remove('invalid');
    span.textContent = '';
  }

  function marcarError(input, span, mensaje) {
    input.classList.add('invalid');
    span.textContent = mensaje;
  }

  // Correo: requerido, máx 100 caracteres, solo @duoc.cl / @profesor.duoc.cl / @gmail.com
  function validarCorreo() {
    const valor = correoInput.value.trim();

    if (!valor) {
      marcarError(correoInput, errorCorreo, 'El correo es obligatorio.');
      return false;
    }
    if (valor.length > 100) {
      marcarError(correoInput, errorCorreo, 'El correo no puede superar los 100 caracteres.');
      return false;
    }
    const match = valor.match(REGEX_CORREO);
    if (!match) {
      marcarError(correoInput, errorCorreo, 'Ingresa un correo con formato válido.');
      return false;
    }
    const dominio = match[1].toLowerCase();
    if (!DOMINIOS_PERMITIDOS.includes(dominio)) {
      marcarError(
        correoInput,
        errorCorreo,
        'Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.'
      );
      return false;
    }

    limpiarError(correoInput, errorCorreo);
    return true;
  }

  // Contraseña: requerida, entre 4 y 10 caracteres
  function validarPassword() {
    const valor = passwordInput.value;

    if (!valor) {
      marcarError(passwordInput, errorPassword, 'La contraseña es obligatoria.');
      return false;
    }
    if (valor.length < 4 || valor.length > 10) {
      marcarError(passwordInput, errorPassword, 'Debe tener entre 4 y 10 caracteres.');
      return false;
    }

    limpiarError(passwordInput, errorPassword);
    return true;
  }

  // Validación en tiempo real: al escribir (para feedback inmediato) y al salir del campo
  correoInput.addEventListener('input', validarCorreo);
  passwordInput.addEventListener('input', validarPassword);
  correoInput.addEventListener('blur', validarCorreo);
  passwordInput.addEventListener('blur', validarPassword);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorGeneral.textContent = '';

    const correoValido = validarCorreo();
    const passwordValido = validarPassword();
    if (!correoValido || !passwordValido) return;

    setCargando(true);

    try {
      // Reemplaza esta parte por tu lógica real del proyecto, por ejemplo validar
      // contra un arreglo de usuarios en JS (mismo que usarás en registro/admin):
      //
      // const usuarios = [
      //   { correo: 'admin@duoc.cl', password: '1234', tipo: 'Administrador' },
      // ];
      // const usuario = usuarios.find(u => u.correo === correoInput.value.trim());
      // if (!usuario || usuario.password !== passwordInput.value) {
      //   throw new Error('Credenciales inválidas');
      // }

      // Simulación temporal:
      await new Promise((resolve) => setTimeout(resolve, 900));

      // window.location.href = 'home.html';
    } catch (err) {
      errorGeneral.textContent = 'Correo o contraseña incorrectos. Inténtalo de nuevo.';
    } finally {
      setCargando(false);
    }
  });

  function setCargando(cargando) {
    btnSubmit.disabled = cargando;
    btnSubmit.querySelector('.btn-text').textContent = cargando ? 'Ingresando...' : 'Iniciar sesión';
    btnSubmit.querySelector('.spinner').hidden = !cargando;
  }
});