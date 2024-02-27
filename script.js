const firebaseConfig = {
  apiKey: "AIzaSyAG7oUdW77DrIZfmv-2Jr5b-0_f-s8UzHc",
  authDomain: "datos-de-formulario-94ec2.firebaseapp.com",
  projectId: "datos-de-formulario-94ec2",
  storageBucket: "datos-de-formulario-94ec2.appspot.com",
  messagingSenderId: "970388599240",
  appId: "1:970388599240:web:623700effcc0f9c0c450fd",
  measurementId: "G-DJC46DTX7L",
};
// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service

const db = firebase.firestore();

document.getElementById("formulario").addEventListener("submit", (event) => {
  event.preventDefault();

  //validar nombre

  let entradaNombre = document.getElementById("name");
  let errorNombre = document.getElementById("nameError");

  if (entradaNombre.value.trim() === "") {
    errorNombre.textContent = "Por favor, introducí tu nombre";
    errorNombre.classList.add("error-message");
  } else {
    errorNombre.textContent = "";
    errorNombre.classList.remove("error-message");
  }

  //validar correo electronico

  let emailEntrada = document.getElementById("email");
  let emailError = document.getElementById("emailError");
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Patrón de validación básico

  if (!emailPattern.test(emailEntrada.value)) {
    emailError.textContent = "Por favor, introducí un mail válido";
    emailError.classList.add("error-message");
  } else {
    emailError.textContent = "";
    emailError.classList.remove("error-message");
  }

  //validar contraseña

    let contrasenaEntrada = document.getElementById('password');
    let contrasenaError = document.getElementById('passwordError');
    let contrasenaPattern =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;
    
    if (!contrasenaPattern.test(contrasenaEntrada.value)) {
      contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres, números, mayúsculas y minúsculas y caracteres especiales';
      contrasenaError.classList.add('error-message');
    } else {
      contrasenaError.textContent = '';
      contrasenaError.classList.remove('error-message');
  }
  

  

  // si todos los campos son validos enviar formulario
 
    if (!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent) {
      db.collection("users")
        .add({
          nombre: entradaNombre.value,
          email: emailEntrada.value,
          password: contrasenaEntrada.value,
        })
        .then((docRef) => {
          alert("El formulario se ha enviado con éxito", docRef.id);
          document.getElementById("formulario").reset();
        })
        .catch((error) => {
          alert(error);
        });
    }
});
