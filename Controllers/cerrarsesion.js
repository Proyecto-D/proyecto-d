import { userstate, loginout } from './firebase.js'

userstate()

const sesion = document.getElementById('logout')
async function cerrarsesion() {
    const verificacion = loginout()
    const comprobar = await verificacion
  
      .then((comprobar) => {
        if (confirm('¿Estás seguro de que deseas cerrar sesion?')) {
            try {
              alert('sesion cerrada')
              window.location.href='../Templates/homeinicio.html'
            } catch (error) {
              alert('Error al eliminar usuario')
              console.error('Error al eliminar usuario:', error)
            }
        }
      })
      .catch((error) => {
      })
  }

  window.addEventListener('DOMContentLoaded', async () => {
    sesion.addEventListener('click', cerrarsesion)
  })
  