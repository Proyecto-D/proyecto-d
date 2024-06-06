function loadContent(page) {
  const container = document.querySelector('.container');
  fetch(page)
    .then(response => response.text())
    .then(data => {
      container.innerHTML = data;
      if (page === 'agregar_produc.html') {
        import('../Controllers/addproductos.js').then(module => {
          module.initializeForm();
        });
      }
      if (page === 'cerveza.html') {
        import('../Controllers/vercervezas.js');
          
      }
      if (page === 'aguardiente.html') {
        import('../Controllers/veraguardiente.js');
          
      }
      if (page === 'productos.html') {
        import('../Controllers/verproductos.js');
          
      }
      if (page === 'brandy.html') {
        import('../Controllers/verbrandy.js');
          
      }
      if (page === 'ginebra.html') {
        import('../Controllers/verginebra.js');
          
      }
      if (page === 'no_licores.html') {
        import('../Controllers/vernolicores.js');
          
      }
      if (page === 'paquetes.html') {
        import('../Controllers/verpaquetes.js');
          
      }
      if (page === 'ron.html') {
        import('../Controllers/verron.js');
          
      }
      if (page === 'tequila.html') {
        import('../Controllers/vertequila.js');
          
      }
      if (page === 'vinos_y_champañas.html') {
        import('../Controllers/vervinosychampañas.js');
          
      }
      if (page === 'vodka.html') {
        import('../Controllers/vervodka.js');
          
      }
      if (page === 'whisky.html') {
        import('../Controllers/verwhisky.js');
          
      }
      if (page == 'carrito.html'){
        import('../Controllers/carrito.js');
        
      }
    })
    .catch(error => console.error('Error loading content:', error));
}

