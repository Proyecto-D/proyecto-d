function loadContent(page) {
  const container = document.querySelector('.container');
  fetch(page)
      .then(response => response.text())
      .then(data => {
          container.innerHTML = data;
          switch(page) {
              case 'agregar_produc.html':
                  import('../Controllers/addproductos.js').then(module => module.initializeForm());
                  break;
              case 'cerveza.html':
                  import('../Controllers/vercervezas.js').then(module => module.Ver());
                  break;
              case 'aguardiente.html':
                  import('../Controllers/veraguardiente.js').then(module => module.Ver());
                  break;
              case 'productos.html':
                  import('../Controllers/verproductos.js').then(module => module.Ver());
                  break;
              case 'brandy.html':
                  import('../Controllers/verbrandy.js').then(module => module.Ver());
                  break;
              case 'ginebra.html':
                  import('../Controllers/verginebra.js').then(module => module.Ver());
                  break;
              case 'no_licores.html':
                  import('../Controllers/vernolicores.js').then(module => module.Ver());
                  break;
              case 'paquetes.html':
                  import('../Controllers/verpaquetes.js').then(module => module.Ver());
                  break;
              case 'ron.html':
                  import('../Controllers/verron.js').then(module => module.Ver());
                  break;
              case 'tequila.html':
                  import('../Controllers/vertequila.js').then(module => module.Ver());
                  break;
              case 'vinos_y_champañas.html':
                  import('../Controllers/vervinosychampañas.js').then(module => module.Ver());
                  break;
              case 'vodka.html':
                  import('../Controllers/vervodka.js').then(module => module.Ver());
                  break;
              case 'whisky.html':
                  import('../Controllers/verwhisky.js').then(module => module.Ver());
                  break;
              case 'carrito.html':
                    import('../Controllers/carrito.js').then(module => module.cargarcarrito());
                  break;
            
            
              default:
                  console.warn('Page not found: ', page);
          }
      })
      .catch(error => console.error('Error loading content:', error));
}
