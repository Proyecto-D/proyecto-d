let metodoSeleccionado = null;

function ElegirMetodo(metodo) {
    metodoSeleccionado = metodo;
    document.getElementById('metodopago').innerText = metodo;
}
function generarReferenciaAleatoria() {
    // Generar un número aleatorio de 14 dígitos
    const referencia = Math.floor(10000000000000 + Math.random() * 90000000000000);
    document.getElementById('referencia').innerText = referencia;
}

function mostrarTotalGeneral() {
    const totalGeneral = localStorage.getItem('totalGeneral');
    if (totalGeneral) {
        document.getElementById('total').innerText = `Total: $${totalGeneral}`;
    }
}

window.onload = function() {
    mostrarTotalGeneral();
    generarReferenciaAleatoria();

    document.querySelector('#visa').addEventListener('click', function() {
        ElegirMetodo('Visa');
    });

    document.querySelector('#mastercard').addEventListener('click', function() {
        ElegirMetodo('Mastercard');
    });

    document.querySelector('#codensa').addEventListener('click', function() {
        ElegirMetodo('Codensa');
    });

    document.querySelector('#pse').addEventListener('click', function() {
        ElegirMetodo('PSE');
    });

    document.querySelector('#nequi').addEventListener('click', function() {
        ElegirMetodo('Nequi');
    });

    document.querySelector('#davidplata').addEventListener('click', function() {
        ElegirMetodo('Daviplata');
    });

    document.querySelector('#efecty').addEventListener('click', function() {
        ElegirMetodo('Efecty');
    });

    document.querySelector('#supergiros').addEventListener('click', function() {
        ElegirMetodo('Supergiros');
    });

    document.querySelector('#bancodebogota').addEventListener('click', function() {
        ElegirMetodo('Banco de Bogotá');
    });

    document.querySelector('#bancolombia').addEventListener('click', function() {
        ElegirMetodo('Bancolombia');
    });

    document.querySelector('#davivienda').addEventListener('click', function() {
        ElegirMetodo('Davivienda');
    });

    document.querySelector('#pagar').addEventListener('click', function() {
        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
    
        if (!nombre || !email) {
            alert('Por favor completa todos los campos antes de continuar.');
            return;
        }
    
        if (!metodoSeleccionado) {
            alert('Por favor selecciona un método de pago antes de continuar.');
            return;
        }
    
        alert('Pago realizado');
        window.location.href = '../Templates/home.html';
    });

    document.querySelector('#modificar-datos').addEventListener('click', function() {
        const nombre = document.querySelector('#nombre');
        const email = document.querySelector('#email');
        const boton = document.querySelector('#modificar-datos');
    
        if (nombre.readOnly && email.readOnly) {
            // Si los campos son de solo lectura, habilita la edición y cambia el texto del botón
            nombre.readOnly = false;
            email.readOnly = false;
            boton.innerText = 'Guardar';
        } else {
            // Si los campos son editables, deshabilita la edición y cambia el texto del botón
            nombre.readOnly = true;
            email.readOnly = true;
            boton.innerText = 'Modificar';
        }
    });
};



