import {
  registerAuth,
  mensajeA,
  CrearUsuario,
  loginauth,
} from '../Controllers/firebase.js'

const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/
const uppercaseLetter = /[A-Z]/
const registrar = document.getElementById('registro')

async function registro() {
  const id = document.getElementById('document').value
  const us = document.getElementById('name').value
  const dir = document.getElementById('address').value
  const tel = document.getElementById('phone').value
  const RH = document.getElementById('birthdate').value
  const email = document.getElementById('email').value
  const Cemail = document.getElementById('confirm-email').value
  const password = document.getElementById('passwordR').value
  const Cpassword = document.getElementById('confirm-passwordR').value
  const Rol = 'Usuario'

  if (password.length < 8) {
    alert('La contraseña debe tener al menos 8 caracteres')
    return
  } else if (!specialCharacters.test(password)) {
    alert('La contraseña debe contener al menos un caracter especial')
    return
  } else if (!uppercaseLetter.test(password)) {
    alert('La contraseña debe contener al menos una letra mayúscula')
    return
  } else if (email != Cemail) {
    alert('El usuario y la confirmación de usuario no coinciden')
    return
  } else if (password != Cpassword) {
    alert('La contraseña y la confirmación de contraseña no coinciden')
    return
  } else {
    const validar = async () => {
      try {
        await registerAuth(email, password)
      } catch (error) {
        throw error
      }
    }
    const datos = async () => {
      try {
        return await CrearUsuario(id, us, RH, dir, tel, Cemail, Cpassword, Rol)
      } catch (error) {
        throw error
      }
    }

    try {
      await validar()
      const docRef = await datos()
      if (docRef.id) {
        alert('Usuario registrado exitosamente')
        await mensajeA()
        console.log('Correo electrónico de verificación enviado con éxito')
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
        await delay(2000)
        const verificar = loginauth(email, password)
        const validation = await verificar
        if (validation != null) {
          window.location.href = '../templates/home.html'
        }
      } else {
        alert('Error al registrar usuario')
      }
    } catch (error) {
      console.error(error)
    }
  }
}

registrar.addEventListener('click', (e) => {
  e.preventDefault()
  registro()
})
