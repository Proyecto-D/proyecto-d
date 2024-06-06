import { Getcategoria, Setcarrito, Getcarrito } from '../Controllers/firebase.js';

const imprimir = document.getElementById('cont');

async function Ver() {
    const categoria = 'Ron'; 

    try {
        const querySnapshot = await Getcategoria(categoria);
        console.log("documentSnapshots:", querySnapshot);

        if (!querySnapshot.empty) {
            let Html = ""; // Inicializar el HTML de las tarjetas
            querySnapshot.forEach((documentSnapshot) => {
                const producto = documentSnapshot.data(); // Obtener los datos del documento
                console.log("producto:", producto);
                // Construir la tarjeta con los datos del producto
                Html += `
                    <div class="card-container" style="width:250px;">
                        <div class="card">
                            <div>
                                <p class="card-text" style="float: right;">${producto.codigo}</p>
                            </div>
                            <img src="${producto.urlproducto}" class="card-img-top" alt="${producto.name}" style="width: 100px; height: auto;"> <!-- Aquí ajusta el tamaño de la imagen -->
                            <div class="card-body">
                                <h5 class="card-title">${producto.name}</h5>
                                <p class="card-text">$${producto.precio}</p>
                                <a href="#" class="btn btn-primary" onclick="agregarAlCarrito('${producto.codigo}', '${producto.name}', '${producto.precio}', '${producto.urlproducto}')">Agregar al Carrito</a>
                            </div>
                        </div>
                    </div>
                `;
            });
            imprimir.innerHTML = Html; // Agregar las tarjetas al contenedor
        } else {
            console.log("No se encontraron documentos con la descripción especificada.");
        }
    } catch (error) {
        console.error('Error obteniendo los productos:', error);
    }
}
// Llama a Ver() directamente cuando la página se haya cargado
Ver();

window.agregarAlCarrito = function(codigo, nombre, precio, urlproducto) {
    const cantidad = 1;
    // Verificar si ya existe un producto con el mismo código
    Getcarrito(codigo)
        .then(docSnapshot => {
            if (docSnapshot.exists()) {
                // Si el producto ya existe, mostrar un alert
                alert('Producto ya agregado anteriormente. Revise su carrito.');
            } else {
                // Si el producto no existe, agregarlo a la colección
                Setcarrito(codigo, nombre, precio, urlproducto, cantidad)
                    .then(() => {
                        alert('Producto agregado al carrito', codigo);
                    })
                    .catch(error => {
                        console.error('Error al agregar producto al carrito:', error);
                    });
            }
        })
        .catch(error => {
            console.error('Error al verificar producto en el carrito:', error);
        });
};
