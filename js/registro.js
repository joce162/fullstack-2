document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registroForm');

  const nombreInput = document.getElementById('nombre');
  const correoInput = document.getElementById('correo');
  const confirmarCorreoInput = document.getElementById('confirmarCorreo');
  const passwordInput = document.getElementById('password');
  const confirmarPasswordInput = document.getElementById('confirmarPassword');
  const regionSelect = document.getElementById('region');
  const comunaSelect = document.getElementById('comuna');

  const errorNombre = document.getElementById('error-nombre');
  const errorCorreo = document.getElementById('error-correo');
  const errorConfirmarCorreo = document.getElementById('error-confirmarCorreo');
  const errorPassword = document.getElementById('error-password');
  const errorConfirmarPassword = document.getElementById('error-confirmarPassword');
  const errorRegion = document.getElementById('error-region');
  const errorComuna = document.getElementById('error-comuna');
  const errorGeneral = document.getElementById('error-general');
  const btnRegistrar = document.getElementById('btnRegistrar');

  // Comunas asociadas a cada región/sitio disponible
  const comunasPorRegion = {
    santiago: ['Santiago', 'Providencia', 'Ñuñoa', 'Las Condes', 'La Florida', 'Maipú'],
    vina: ['Viña del Mar', 'Concón', 'Quilpué', 'Villa Alemana'],
    valparaiso: ['Valparaíso', 'Casablanca', 'Quintero', 'Puchuncaví'],
  };

  // Al cambiar la región, se llena la comuna con las opciones correspondientes
  regionSelect.addEventListener('change', () => {
    const region = regionSelect.value;
    const comunas = comunasPorRegion[region] || [];

    comunaSelect.innerHTML = '<option value="" selected disabled>-- Seleccione la comuna --</option>';

    comunas.forEach(nombreComuna => {
      const opcion = document.createElement('option');
      opcion.value = nombreComuna.toLowerCase();
      opcion.textContent = nombreComuna;
      comunaSelect.appendChild(opcion);
    });

    comunaSelect.disabled = comunas.length === 0;
    limpiarError(regionSelect, errorRegion);
  });

  function limpiarError(input, span) {
    input.classList.remove('invalid');
    span.textContent = '';
  }

  function marcarError(input, span, mensaje) {
    input.classList.add('invalid');
    span.textContent = mensaje;
  }

  // Revisa que un campo de texto no esté vacío
  function validarCampoVacio(input, span, mensaje) {
    if (input.value.trim() === '') {
      marcarError(input, span, mensaje);
      return false;
    }
    limpiarError(input, span);
    return true;
  }

  // Revisa que un <select> tenga una opción elegida
  function validarSelectVacio(select, span, mensaje) {
    if (select.value === '') {
      marcarError(select, span, mensaje);
      return false;
    }
    limpiarError(select, span);
    return true;
  }

  // Valida en tiempo real al salir de cada campo
  nombreInput.addEventListener('blur', () => validarCampoVacio(nombreInput, errorNombre, 'El nombre es obligatorio.'));
  correoInput.addEventListener('blur', () => validarCampoVacio(correoInput, errorCorreo, 'El correo es obligatorio.'));
  confirmarCorreoInput.addEventListener('blur', () => validarCampoVacio(confirmarCorreoInput, errorConfirmarCorreo, 'Debes confirmar el correo.'));
  passwordInput.addEventListener('blur', () => validarCampoVacio(passwordInput, errorPassword, 'La contraseña es obligatoria.'));
  confirmarPasswordInput.addEventListener('blur', () => validarCampoVacio(confirmarPasswordInput, errorConfirmarPassword, 'Debes confirmar la contraseña.'));

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    errorGeneral.textContent = '';

    // Se revisan todos los campos obligatorios; el teléfono queda fuera porque es opcional
    const nombreValido = validarCampoVacio(nombreInput, errorNombre, 'El nombre es obligatorio.');
    const correoValido = validarCampoVacio(correoInput, errorCorreo, 'El correo es obligatorio.');
    const confirmarCorreoValido = validarCampoVacio(confirmarCorreoInput, errorConfirmarCorreo, 'Debes confirmar el correo.');
    const passwordValido = validarCampoVacio(passwordInput, errorPassword, 'La contraseña es obligatoria.');
    const confirmarPasswordValido = validarCampoVacio(confirmarPasswordInput, errorConfirmarPassword, 'Debes confirmar la contraseña.');
    const regionValida = validarSelectVacio(regionSelect, errorRegion, 'Selecciona una región.');
    const comunaValida = validarSelectVacio(comunaSelect, errorComuna, 'Selecciona una comuna.');

    const todosCompletos =
      nombreValido && correoValido && confirmarCorreoValido &&
      passwordValido && confirmarPasswordValido && regionValida && comunaValida;

    if (!todosCompletos) {
      errorGeneral.textContent = 'Debes completar todos los campos obligatorios para continuar.';
      return;
    }

    if (correoInput.value.trim() !== confirmarCorreoInput.value.trim()) {
      errorGeneral.textContent = 'Los correos ingresados no coinciden.';
      return;
    }

    if (passwordInput.value !== confirmarPasswordInput.value) {
      errorGeneral.textContent = 'Las contraseñas ingresadas no coinciden.';
      return;
    }

    btnRegistrar.disabled = true;
    btnRegistrar.querySelector('.btn-text').textContent = 'Registrando...';
    btnRegistrar.querySelector('.spinner').hidden = false;

    // Aquí luego se agregará el guardado real (por ejemplo, en un array de usuarios
    // en localStorage, siguiendo el mismo patrón del CRUD de productos de la guía).
    await new Promise(resolve => setTimeout(resolve, 900));

    btnRegistrar.disabled = false;
    btnRegistrar.querySelector('.btn-text').textContent = 'REGISTRAR';
    btnRegistrar.querySelector('.spinner').hidden = true;
  });
});