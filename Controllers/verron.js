import { Getcategoria, Setcarrito, Getcarrito, auth, verificarAutenticacion } from '../Controllers/firebase.js';

export async function Ver() {
    const imprimir = document.getElementById('cont');
    const categoria = 'Ron'; 

    try {
        const querySnapshot = await Getcategoria(categoria);
        console.log("documentSnapshots:", querySnapshot);

        if (!querySnapshot.empty) {
            let Html = "";
            querySnapshot.forEach((documentSnapshot) => {
                const producto = documentSnapshot.data();
                console.log("producto:", producto);
                Html += `
                    <div class="card-container" style="width:250px;">
                        <div class="card">
                            <div>
                                <p class="card-text" style="float: right;">${producto.codigo}</p>
                            </div>
                            <img src="${producto.urlproducto}" class="card-img-top" alt="${producto.name}" style="width: 100px; height: auto;">
                            <div class="card-body">
                                <h5 class="card-title">${producto.name}</h5>
                                <p class="card-text">$${producto.precio}</p>
                                <a href="#" class="btn btn-primary" onclick="agregarAlCarrito('${producto.codigo}', '${producto.name}', '${producto.precio}', '${producto.urlproducto}')">Agregar al Carrito</a>
                            </div>
                        </div>
                    </div>
                `;
            });
            imprimir.innerHTML = Html;
        } else {
            console.log("No se encontraron documentos con la descripción especificada.");
        }
    } catch (error) {
        console.error('Error obteniendo los productos:', error);
    }
}

window.agregarAlCarrito = function(codigo, nombre, precio, urlproducto) {
    const cantidad = 1;
    // Verificar si el usuario está autenticado
    const estaAutenticado = verificarAutenticacion(auth.currentUser);
    if (!estaAutenticado) {
        // Usuario no autenticado, mostrar mensaje
        alert('Debe iniciar sesión para poder agregar productos al carrito de compras');
        // Detener la ejecución de la función
        return;
    }
    // Usuario autenticado, proceder a agregar al carrito
    Getcarrito(codigo)
        .then(docSnapshot => {
            if (docSnapshot.exists()) {
                alert('Producto ya agregado anteriormente. Revise su carrito.');
            } else {
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
