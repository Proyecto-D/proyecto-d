import { loginFacebook, providerFacebook } from '../Controllers/firebase.js'

const facebook = document.getElementById('facebookR')

async function logFacebook() {
  try {
    await loginFacebook(providerFacebook)
    window.location.href = '../templates/home.html'
  } catch (error) {
    console.error('Error al iniciar sesión con Facebook:', error)
    alert('Error al iniciar sesión con Facebook. Inténtelo de nuevo.')
  }
}

window.addEventListener('DOMContentLoaded', () => {
  facebook.addEventListener('click', logFacebook)
})
