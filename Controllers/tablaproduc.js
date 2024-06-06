import { GetProductosDocs, EliminarProducto, Setregister } from './firebase.js'

export async function mostrarProductos() {
  const querySnapshot = await GetProductosDocs()

  const tablaProductos = document.getElementById('tablaProductos')

  querySnapshot.forEach((doc) => {
    // Aquí puedes acceder a los datos de cada producto
    const producto = doc.data()

    // Crear una nueva fila
    const tr = document.createElement('tr')
    tr.dataset.codigo = producto.codigo // Agregar el código del producto como un atributo de datos

    // Crear una celda para cada propiedad del producto
    const tdCodigo = document.createElement('td')
    tdCodigo.textContent = producto.codigo
    tr.appendChild(tdCodigo)

    const tdNombre = document.createElement('td')
    tdNombre.textContent = producto.name
    tr.appendChild(tdNombre)

    const tdCategoria = document.createElement('td')
    tdCategoria.textContent = producto.categoria
    tr.appendChild(tdCategoria)

    const tdPrecio = document.createElement('td')
    tdPrecio.textContent = producto.precio
    tr.appendChild(tdPrecio)

    const tdUrlProducto = document.createElement('td')
    const imgProducto = document.createElement('img')
    imgProducto.src = producto.urlproducto
    imgProducto.style.width = '100px' // Ajusta el tamaño de la imagen según tus necesidades
    tdUrlProducto.appendChild(imgProducto)
    tr.appendChild(tdUrlProducto)

    // Crear los botones de editar y eliminar
   // Crear el botón de editar
const btnEditar = document.createElement('button')
btnEditar.textContent = 'Editar'
btnEditar.className = 'btn btn-success'
btnEditar.addEventListener('click', () => {
  if (btnEditar.textContent === 'Editar') {
    // Hacer los campos editables
    tdNombre.contentEditable = true
    tdCategoria.contentEditable = true
    tdPrecio.contentEditable = true
    // Cambiar el texto del botón a "Guardar"
    alert('Ahora puede editar el contenido del producto')
    btnEditar.textContent = 'Guardar'
  } else {
    // Guardar los cambios en Firebase
    Setregister(producto.codigo, tdNombre.textContent, tdCategoria.textContent, tdPrecio.textContent, producto.urlproducto)
    // Hacer los campos no editables
    tdNombre.contentEditable = false
    tdCategoria.contentEditable = false
    tdPrecio.contentEditable = false
    alert('Los cambios han sido guardados')
    // Cambiar el texto del botón de nuevo a "Editar"
    btnEditar.textContent = 'Editar'
  }
})

const btnEliminar = document.createElement('button')
btnEliminar.textContent = 'Eliminar'
btnEliminar.className = 'btn btn-success'
btnEliminar.addEventListener('click', async () => {
  // Confirmar antes de eliminar
  let confirmar = confirm("¿Estás seguro de que quieres eliminar este producto?");
  if (confirmar) {
    // Eliminar el producto de Firebase
    await EliminarProducto(producto.codigo)
    // Eliminar la fila de la tabla
    tr.remove()
  }
})
    // Agregar los botones a la fila
    tr.appendChild(btnEditar)
    tr.appendChild(btnEliminar)

    // Agregar la fila a la tabla
    tablaProductos.appendChild(tr)
  })
}

mostrarProductos()
