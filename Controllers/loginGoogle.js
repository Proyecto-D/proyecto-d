import { loginGoogle, mensajeA } from '../Controllers/firebase.js'

const google = document.getElementById('googleR')

export async function logGoogle() {
  try {
    await loginGoogle()
    mensajeA()
      .then(() => {
        console.log('Correo electrónico de verificación enviado con éxito')
      })
      .catch((error) => {
        console.error(
          'Error al enviar correo electrónico de verificación:',
          error
        )
      })
    window.location.href = '../templates/home.html'
  } catch (error) {
    console.error('Error al iniciar sesión con Google:', error)
    alert('Error al iniciar sesión con Google. Inténtelo de nuevo.')
  }
}

window.addEventListener('DOMContentLoaded', () => {
  google.addEventListener('click', logGoogle)
})
