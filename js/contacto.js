// js/contacto.js

document.addEventListener('DOMContentLoaded', () => {
    const formContacto = document.getElementById('form-contacto');
    
    if (formContacto) {
        formContacto.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nombre = document.getElementById('nombre').value;
            alert(`¡Gracias ${nombre}! Tu mensaje ha sido enviado exitosamente.`);
            formContacto.reset();
        });
    }
});