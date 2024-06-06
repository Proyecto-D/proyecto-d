import { 
    GetCarritoDocs, 
    EliminarProductoDelCarrito, 
    deleteCollection 
} from '../Controllers/firebase.js';


const vaciar = document.getElementById('vaciarCarritoBtn');
const pagar = document.getElementById('pagarBtn');
const totalGeneralElement = document.getElementById('totalGeneral');
const mensajeSinProductos = document.getElementById('mensajeSinProductos');

export async function cargarcarrito() {

    const imprimir = document.getElementById('contcarrito');

    try {
        const querySnapshot = await GetCarritoDocs();
        let html = "";
        let totalGeneral = 0;

        if (querySnapshot.empty) {
            mostrarMensajeSinProductos();
        } else {
            querySnapshot.forEach((doc) => {
                const producto = doc.data();
                const total = producto.cantidad * producto.precio;
                totalGeneral += total;
                html += `
                <tr data-codigo="${producto.codigo}">
                <td>
                    <div class="card-container" style="width: 100%;">
                        <div class="card" style="width: 400px;">
                            <div class="card-body" style="display: flex; align-items: center;">
                                <img src="${producto.urlproducto}" class="card-img-top" alt="${producto.name}" style="width: 200px; height: auto; margin-right: 20px;">
                                <div>
                                    <p class="card-text">${producto.codigo}</p>
                                    <h5 class="card-title">${producto.name}</h5>
                                    <p class="card-text">$${producto.precio}</p>
                                    <button class="btn btn-danger" onclick="eliminarDelCarrito('${producto.codigo}')">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
                    <td>
                        <button onclick="decrementarCantidad(this,'${producto.precio}' )">-</button>
                        <span class="contador">1</span>
                        <button onclick="incrementarCantidad(this, '${producto.precio}')">+</button>
                    </td>
                    <td class="total">$${total}</td>
                </tr>
                `;
                });
            imprimir.innerHTML = html;
            mostrarTotalGeneral(totalGeneral);
        }
    } catch (error) {
        console.error('Error obteniendo productos del carrito:', error);
    }
}


window.eliminarDelCarrito = async function(codigo) {
    try {
        alert('Producto eliminado del carrito', codigo);
        await EliminarProductoDelCarrito(codigo)
        cargarcarrito();
    } catch (error) {
        console.error('Error al eliminar producto del carrito:', error);
    }
};


window.incrementarCantidad = async function(button, precio) {
    var span = button.parentNode.querySelector('.contador');
    var cantidad = parseInt(span.innerHTML);
    cantidad++;
    span.innerHTML = cantidad;

    actualizarTotal(button, cantidad, precio);
}

window.decrementarCantidad = async function(button, precio) {
    var span = button.parentNode.querySelector('.contador');
    var cantidad = parseInt(span.innerHTML);
    if (cantidad > 1) {
        cantidad--;
        span.innerHTML = cantidad;
        
        actualizarTotal(button, cantidad, precio);
    }
}

function actualizarTotal(button, cantidad, precio) {
    
    var totalElement = button.closest('tr').querySelector('.total');  // Obtener el elemento td que contiene el total
    var nuevoTotal = cantidad * precio; // Calcular el nuevo total
    nuevoTotal = '$' + nuevoTotal;  // Agregar el signo de pesos ($) al nuevo total
    totalElement.textContent = nuevoTotal;   // Actualizar el contenido HTML del total
    actualizarTotalGeneral();   // Actualizar el total general después de actualizar el total de un producto
}

function actualizarTotalGeneral() {

    // Recalcular el total general sumando todos los totales de los productos
    var totalGeneral = 0;
    var totalElements = document.querySelectorAll('.total');
    totalElements.forEach((element) => {
        totalGeneral += parseFloat(element.textContent.replace('$', '')); // Convertir el texto a número y sumar
    });

    mostrarTotalGeneral(totalGeneral);  // Mostrar el total general actualizado
}
    
function mostrarMensajeSinProductos() {
    mensajeSinProductos.style.display = 'block';
}


function mostrarTotalGeneral(total) {
    totalGeneralElement.textContent = `Total: $${total}`;
    localStorage.setItem('totalGeneral', total); // Guardar el total en localStorage
}

async function eliminarcarrito(){
    await deleteCollection('datoscarrito');
}
vaciar.addEventListener('click', async () => {
    try {
       await eliminarcarrito();
        alert('carrito vaciado exitosamente');
        
        imprimir.innerHTML = ""; // Limpiar la tabla antes de cargar el carrito de nuevo
        await cargarcarrito();
    } catch (error) {
        console.error('Error al eliminar', error);
    }
});

pagar.addEventListener('click', async () => {
    try {
        imprimir.innerHTML = "";
        await eliminarcarrito();
        alert('Redirigiendo a la pasarela de pago...')
         window.location.href = '../Templates/pasarela.html'; // Redirigir a la página de pasarela
    } catch (error) {
        console.error('Error al eliminar', error);
    }
});


await cargarcarrito();