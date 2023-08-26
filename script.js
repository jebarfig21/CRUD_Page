// Función para manejar el envío del formulario
function crearAlumno(){
    event.preventDefault(); // Evita que se envíe el formulario de manera tradicional

    // Obtiene los valores de los campos
    var correo = document.getElementById("correo").value;
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var edad = document.getElementById("edad").value;
    var calificacion = document.getElementById("calificacion").value;

    // Crea un objeto para almacenar los datos
    var nuevoDato = {
        correo: correo,
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        calificacion: calificacion
    };
    //Obtener arreglo de  datos en local storage
    
    // Convierte el objeto a JSON y lo guarda en localStorage
    localStorage.setItem(correo, JSON.stringify(nuevoDato));

    // Limpia los campos del formulario
    document.getElementById("correo").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("edad").value = "";
    document.getElementById("calificacion").value = "";

    alert("Datos guardados en localStorage.");
}

//Funcion para obtener todos los alumnos almacenados en localStorage
function readAllAlumnos(){
    var alumnos=[]
    for (var i = 0; i < localStorage.length; i++) {
        var clave = localStorage.key(i);
        var valor = localStorage.getItem(clave);
        alumnos.push(valor)
    }
    return alumnos
}

function showAlumnos() {
    // Obtener los datos del localStorage
    alumnos=readAllAlumnos()
    // Verificar si hay datos en localStorage
    if (alumnos.length > 0) {
        // Crear una variable para almacenar la representación HTML de los datos
        var tabla_html = "  <thead><tr><th scope='col'>Correo</th><th scope='col'>Nombre</th><th scope='col'>Apellido</th><th scope='col'>Edad</th><th scope='col'>Calificación</th><th scope='col'>Editar</th><th scope='col'>Eliminar</th></tr></thead>";
        // Iterar a través de los datos y construir la representación HTML
        for (var i=0; i<alumnos.length;i++) {
            alumno=JSON.parse(alumnos[i])
            tabla_html +='<tr>';
            tabla_html +='<th>'+alumno.correo+'</th>'
            tabla_html +='<td>'+alumno.nombre+'</td>'
            tabla_html +='<td>'+alumno.apellido+'</td>'
            tabla_html +='<td>'+alumno.edad+'</td>'
            tabla_html +='<td>'+alumno.calificacion+'</td>'
            tabla_html +='<td> <button type="button" class="btn btn-info">Editar</button> </td>'
            tabla_html +='<td> <button type="button" class="btn btn-danger" onclick=deleteAlumno(alumno.correo)>Eliminar</button> </td>'
            tabla_html +='</tr><br>'
        }
        // Insertar la representación HTML en el contenedor
        tabla= document.getElementById('datosAlumnos')
        tabla.innerHTML = tabla_html;        
    }
}

function deleteAlumno(correo){
    console.log(correo)
    console.log("Intentando eliminar")
    localStorage.removeItem(correo)
}

window.onload = showAlumnos;

