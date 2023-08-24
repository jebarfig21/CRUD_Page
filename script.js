
// Función para manejar el envío del formulario
function crearAlumno(){
    event.preventDefault(); // Evita que se envíe el formulario de manera tradicional

    // Obtiene los valores de los campos
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var edad = document.getElementById("edad").value;
    var calificacion = document.getElementById("calificacion").value;

    // Crea un objeto para almacenar los datos
    var nuevoDato = {
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        calificacion: calificacion
    };
    //Obtener arreglo de  datos en local storage
    var datosGuardados = localStorage.getItem("datosUsuario");
    //console.log(typeof datosGuardados) //String

    datosGuardados = datosGuardados ? JSON.parse(datosGuardados) : [];
    
    //Pasar el nuevo object a json
    nuevoDato = JSON.stringify(nuevoDato)

    //Meter el string nuevo en el viejo
    var datosActualizados = JSON.stringify(datosGuardados) 
    console.log(typeof datosActualizados)
    console.log(datosActualizados)
    datosActualizados.push(nuevoDato)

    console.log("Para guardar")
    // Convierte el objeto a JSON y lo guarda en localStorage
    localStorage.setItem("datosUsuario", datosGuardados);

    // Limpia los campos del formulario
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("edad").value = "";
    document.getElementById("calificacion").value = "";

    alert("Datos guardados en localStorage.");
}

//Funcion para obtener todos los alumnos almacenados en localStorage
function readAllAlumnos(){
    var datosGuardados = localStorage.getItem("datosUsuario");

    // Verificar si ya hay datos en localStorage
    var datos = datosGuardados ? JSON.parse(datosGuardados) : [];
    return datos
}

function showAlumnos() {
    // Obtener los datos del localStorage
    var datosGuardados = localStorage.getItem("datosUsuario");
    // Verificar si hay datos en localStorage
    if (datosGuardados) {
        // Convertir los datos a un arreglo
        var datos = readAllAlumnos()

        
        // Obtener el elemento donde deseas mostrar los datos
        var tabla = document.getElementById("datosAlumnos");

        // Crear una variable para almacenar la representación HTML de los datos
        var tabla_html = "";

        // Iterar a través de los datos y construir la representación HTML
        /*for (var clave in datos) {
                if (datos.hasOwnProperty(clave)) {
                    console.log(clave + ": " + datos[clave]);
                    console.log("hardcode")
                }}
            /*
            tabla_html += "<p>Nombre: " + dato.nombre + "</p>";
            tabla_html += "<p>Apellido: " + dato.apellido + "</p>";
            tabla_html += "<p>Edad: " + dato.edad + "</p>";
            tabla_html += "<p>Calificación: " + dato.calificacion + "</p>";
            tabla_html += "<hr>"; // Línea separadora entre los datos
        }*/
        
        // Insertar la representación HTML en el contenedor
        tabla.innerHTML = tabla_html;
    }
}
window.onload = showAlumnos;