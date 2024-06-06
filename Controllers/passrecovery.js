import { cambiar } from '../Controllers/firebase.js'

const recover = document.getElementById('recort')
const voli = document.getElementById('volver')

async function resetear() {
  const email = document.getElementById('verCorr').value

  const verificar = cambiar(email)
  const validation = await verificar

    .then(() => {
      alert('resert password seccesfull' + email)
      window.location.href = '../Templates/login.html'
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      // ..
    })
}

window.addEventListener('DOMContentLoaded', async () => {
  recover.addEventListener('click', resetear)
})

async function volver() {
  window.location.href = '../Templates/homeinicio.html'
}
window.addEventListener('DOMContentLoaded', async () => {
  voli.addEventListener('click', volver)
})
