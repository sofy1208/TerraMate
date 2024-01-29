    //Formulario de contacto

document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('formContacto');
    const ingreso = document.getElementById('ingreso');

    form.addEventListener('submit', function (event) {
        if (validateForm()) {
            alert('Formulario enviado correctamente');
        } else {
            event.preventDefault();
        }
    });

    function validateForm() {
      
        const name = document.getElementById('name').value;
        const mail = document.getElementById('mail').value;
        const cel = document.getElementById('cel').value;
        const consulta = document.getElementById('consulta').value;

        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneValid = /^\d{10}$/;

        if (name.trim() === '') {
            alert('Por favor, ingrese su nombre');
            return false;
        }

        if (consulta.trim() === '') {
            alert('Por favor, ingrese su mensaje');
            return false;
        }

        if (!emailValid.test(mail)) {
            alert('Por favor, ingrese un correo electrónico válido');
            return false;
        }

        if (!phoneValid.test(cel)) {
            alert('Por favor, ingrese un número de teléfono válido');
            return false;
        }

        return true;
    }
    
});