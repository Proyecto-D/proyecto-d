import { loginFacebook, providerFacebook } from '../Controllers/firebase.js'

const facebook = document.getElementById('facebook')

async function logFacebook() {
  try {
    await loginFacebook(providerFacebook)
    window.location.href = '../templates/home.html'
  } catch (error) {
    console.log(error)
  }
}

window.addEventListener('DOMContentLoaded', () => {
  facebook.addEventListener('click', logFacebook)
})
