import { Setregister, archivoimg } from './firebase.js';

async function guardar(event) {
    event.preventDefault();
    const cod = document.getElementById('code').value;
    const nombre = document.getElementById('name').value;
    const categ = document.getElementById('cate').value;
    const precio = document.getElementById('precio').value;
    const imgprod = document.getElementById('fileimg').files[0];

    try {
        let urlarchivo = '';
        if (imgprod) {
            urlarchivo = await archivoimg(imgprod, nombre);
        }
        await Setregister(cod, nombre, categ, precio, urlarchivo);
        alert('Registro exitoso');
        document.getElementById('name').value = '';
        document.getElementById('fileimg').value = '';

    } catch (e) {
        console.error('error', e);
        alert('Registro fallido');
    }
}

export function initializeForm() {
    const save = document.getElementById('btnregister');
    if (save) {
        save.addEventListener('click', guardar);
    }
}
