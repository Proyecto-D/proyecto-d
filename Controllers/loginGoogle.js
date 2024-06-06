import { loginGoogle, userstate, mensajeA } from '../Controllers/firebase.js'

const google = document.getElementById('google')

export async function logGoogle() {
  try {
    await loginGoogle()
    userstate()
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
    window.location.href = '../Templates/home.html'
  } catch (error) {
    console.error('Error al iniciar sesión con Google:', error)
    alert('Error al iniciar sesión con Google. Inténtelo de nuevo.')
  }
}

window.addEventListener('DOMContentLoaded', () => {
  google.addEventListener('click', logGoogle)
})
