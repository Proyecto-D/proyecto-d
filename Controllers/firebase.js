import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js'

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js'

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js'

import {
  getFirestore,
  collection,
  deleteDoc,
  addDoc,
  getDocs,
  setDoc,
  doc,
  getDoc,
  query,
  where,
} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js'

const firebaseConfig = {
  apiKey: 'AIzaSyBknJqOfLN4Vs_pXdFzGVeXNYOItDvoPgw',
  authDomain: 'licorerafantasma.firebaseapp.com',
  projectId: 'licorerafantasma',
  storageBucket: 'licorerafantasma.appspot.com',
  messagingSenderId: '155235992711',
  appId: '1:155235992711:web:09bb2ab6306583ac95a422',
  measurementId: 'G-W3QW35PG2H',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage()
const providerGoogle = new GoogleAuthProvider()
const providerFabook = new FacebookAuthProvider()



export function verificarAutenticacion(user) {
  if (user) {
    console.log('Usuario autenticado:', user.uid);
    return true;
  } else {
    console.log('No hay ningún usuario autenticado.');
    return false;
  }
}

//agregar datos con id
export const Setregister = (codigo, name, categoria, precio, urlproducto) =>
  setDoc(doc(db, 'Productos', codigo), {
    codigo,
    name,
    categoria,
    precio,
    urlproducto,
  })

export const Setcarrito = (codigo, name, precio, urlproducto, cantidad) =>
  setDoc(doc(db, 'datoscarrito', codigo), {
    codigo,
    name,
    precio,
    urlproducto,
    cantidad,
  })

// Constante para obtener la referencia a la colección "datoscarrito"
export const Carritoref = collection(db, 'datoscarrito')

// Constante para obtener todos los documentos de la colección "datoscarrito"
export const GetCarritoDocs = async () => {
  try {
    const querySnapshot = await getDocs(Carritoref)
    return querySnapshot
  } catch (error) {
    console.error('Error obteniendo documentos del carrito:', error)
    throw error
  }
}

export const Getcarrito = (codigo) => getDoc(doc(db, 'datoscarrito', codigo))

// Función para eliminar un producto del carrito por su código
export const EliminarProductoDelCarrito = async (codigo) => {
  try {
    await deleteDoc(doc(db, 'datoscarrito', codigo))
    console.log('Producto eliminado del carrito:', codigo)
  } catch (error) {
    console.error('Error al eliminar producto del carrito:', error)
    throw error
  }
}

export async function deleteCollection(collectionPath) {
  const querySnapshot = await getDocs(collection(db, collectionPath))

  querySnapshot.forEach(async (doc) => {
    try {
      await deleteDoc(doc.ref)
      console.log(`Documento eliminado: ${doc.id}`)
    } catch (error) {
      console.error(`Error al eliminar documento ${doc.id}:`, error)
    }
  })
}

// Constante para obtener la referencia a la colección "Productos"
export const ProductosRef = collection(db, 'Productos')

// Función para obtener todos los documentos de la colección "Productos"
export const GetProductosDocs = async () => {
  try {
    const querySnapshot = await getDocs(ProductosRef)
    return querySnapshot
  } catch (error) {
    console.error('Error obteniendo documentos de productos:', error)
    throw error
  }
}


export const EliminarProducto = async (codigo) => {
  try {
    await deleteDoc(doc(db, 'Productos', codigo))
    console.log('Producto eliminado del carrito:', codigo)
  } catch (error) {
    console.error('Error al eliminar producto del carrito:', error)
    throw error
  }
}

//Leer registro especifico
export const Getregister = (codigo) => getDoc(doc(db, 'Productos', codigo))

//Unidad de almacenamiento storage
export const archivoimg = async (file, referencia) => {
  const storageref = ref(storage, `ProductosImg/${referencia + file.name}`)
  await uploadBytes(storageref, file)
  const url = await getDownloadURL(storageref)
  return url
}

//autenticacion de usuario
export const loginauth = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)

export const userCollectionRef = collection(db, 'usuario')

export const q = async (email) => {
  try {
    const querySnapshot = await getDocs(
      query(userCollectionRef, where('email', '==', email))
    )
    return querySnapshot
  } catch (error) {
    throw error
  }
}

// inicio con Google
export const loginGoogle = () => signInWithPopup(auth, providerGoogle)

// inicio sesion con Facebook
export const loginFacebook = () => signInWithPopup(auth, providerFabook)
export const providerFacebook = new FacebookAuthProvider()

// cerrar sesion usuario
export const loginout = () => signOut(auth)

// estado del usuario
export function userstate() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid
      console.log(uid)
    } else {
      alert(
        'Debe iniciar sesión para poder agregar productos al carrito de compras'
      )
    }
  })
}

//registrar usuario en authentication

export const registerAuth = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password)

//crear datos de usuario

export const CrearUsuario = async (
  identificacion,
  nombre,
  fnacimiento,
  direccion,
  telefono,
  email,
  contra,
  rol
) => {
  try {
    const docRef = await addDoc(collection(db, 'usuario'), {
      identificacion,
      nombre,
      fnacimiento,
      direccion,
      telefono,
      email,
      contra,
      rol,
    })
    return docRef
  } catch (error) {
    throw error
  }
}

//mensaje de creacion de cuenta

export const mensajeA = () => sendEmailVerification(auth.currentUser)

// Función para obtener documentos por descripción (categoria)
export async function Getcategoria(categoria) {
  const q = query(
    collection(db, 'Productos'),
    where('categoria', '==', categoria)
  )
  const querySnapshot = await getDocs(q)
  console.log('Número de documentos encontrados:', querySnapshot.size)
  return querySnapshot
}

export async function Getcategorias(categorias) {
  const promises = categorias.map(async (categoria) => {
    const q = query(
      collection(db, 'Productos'),
      where('categoria', '==', categoria)
    )
    return await getDocs(q)
  })

  // Esperar a que todas las consultas se resuelvan
  const querySnapshots = await Promise.all(promises)

  // Combinar todos los documentos obtenidos en un solo array
  let combinedResults = []
  querySnapshots.forEach((snapshot) => {
    snapshot.forEach((doc) => {
      combinedResults.push(doc)
    })
  })

  console.log('Número total de documentos encontrados:', combinedResults.length)
  return combinedResults
}
