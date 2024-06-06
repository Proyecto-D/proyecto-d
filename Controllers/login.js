import { loginauth, q } from '../Controllers/firebase.js'

const caja = document.getElementById('login')
const boton = caja['inicio']

async function validarCampos() {
  const email = caja['username'].value.trim()
  const password = caja['password'].value.trim()

  if (email === '' || password === '') {
    alert('Debe llenar todos los datos')
    return false
  }
  return true
}

async function inicioS() {
  const email = caja['username'].value
  const password = caja['password'].value

  const verificar = loginauth(email, password)
  const validation = await verificar

  if (validation != null) {
    try {
      const querySnapshot = await q(email)
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const userData = doc.data()
          if (userData.rol == 'Usuario') {
            alert('¡Bienvenido usuario!')
            window.location.href = '../templates/us.html'
          } else if (userData.rol == 'Administrador') {
            alert('¡Bienvenido administrador!')
            window.location.href = '../templates/home.html'
          } else {
            alert('Error: El usuario no tiene un rol válido')
          }
        })
      } else {
        console.log('No se encontró ningún usuario con ese email')
        alert('Error: No se encontró ningún usuario con ese email')
      }
    } catch (error) {
      console.log('Error al buscar usuario en Firestore:', error)
      alert('Error al buscar usuario en Firestore')
    }
  } else {
    console.log('Sesion ' + email + ' not validation')
    alert('Error de usuario: Verifique usuario y/o contraseña')
  }
}

boton.addEventListener('click', (e) => {
  e.preventDefault()
  if (validarCampos()) {
    inicioS()
  }
})
