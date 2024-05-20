// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
  import {getFirestore,collection,addDoc,onSnapshot,deleteDoc,doc,updateDoc} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAVMPwYyzfomxTdROK_jYhJ72QBT0cy2zw",
    authDomain: "hotel-2a939.firebaseapp.com",
    projectId: "hotel-2a939",
    storageBucket: "hotel-2a939.appspot.com",
    messagingSenderId: "342922590938",
    appId: "1:342922590938:web:b86f4304821e21f3a983e3"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // constancia de la base de datos
  const db=getFirestore(app);

  const empleadosCollection = collection(db, 'empleados');

  let editando = false;
  
  const formulario = document.querySelector('#formulario');
  const nombreInput = document.querySelector('#nombre');
  const puestoInput = document.querySelector('#puesto');
  const btnAgregarInput = document.querySelector('#btnAgregar');
  
  formulario.addEventListener('submit', validarFormulario);
  
  function validarFormulario(e) {
    e.preventDefault();
  
    const nombre = nombreInput.value.trim();
    const puesto = puestoInput.value.trim();
  
    if (nombre === '' || puesto === '') {
      alert('Todos los campos se deben llenar');
      return;
    }
  
    if (editando) {
      editarEmpleado();
      editando = false;
    } else {
      agregarEmpleado(nombre, puesto);
    }
  }
  
  async function agregarEmpleado(nombre, puesto) {
    try {
      const docRef = await addDoc(empleadosCollection, {
        nombre: nombre,
        puesto: puesto
      });
      console.log("Empleado agregado con ID: ", docRef.id);
      mostrarEmpleados();
      formulario.reset();
    } catch (error) {
      console.error("Error agregando empleado: ", error);
    }
  }
  
  function mostrarEmpleados() {
    limpiarHTML();
  
    onSnapshot(empleadosCollection, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const empleado = doc.data();
        const { nombre, puesto } = empleado;
  
        const parrafo = document.createElement('p');
        parrafo.textContent = `${doc.id} - ${nombre} - ${puesto} - `;
        parrafo.dataset.id = doc.id;
  
        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarEmpleado(doc.id);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.appendChild(editarBoton);
  
        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarEmpleado(doc.id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.appendChild(eliminarBoton);
  
        const hr = document.createElement('hr');
  
        document.querySelector('.div-empleados').appendChild(parrafo);
        document.querySelector('.div-empleados').appendChild(hr);
      });
    });
  }
  
  function cargarEmpleado(id) {
    // Puedes implementar esta función si deseas cargar un empleado para edición
  }
  
  function editarEmpleado() {
    // Puedes implementar esta función si deseas editar un empleado
  }
  
  async function eliminarEmpleado(id) {
    try {
      await deleteDoc(doc(db, 'empleados', id));
      console.log("Empleado eliminado con ID: ", id);
      limpiarHTML();
      mostrarEmpleados();
    } catch (error) {
      console.error("Error eliminando empleado: ", error);
    }
  }
  
  function limpiarHTML() {
    const divEmpleados = document.querySelector('.div-empleados');
    while (divEmpleados.firstChild) {
      divEmpleados.removeChild(divEmpleados.firstChild);
    }
  }
  
  // Mostrar empleados al cargar la página
  document.addEventListener('DOMContentLoaded', mostrarEmpleados);