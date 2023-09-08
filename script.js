/*
* Agrega el registro de un alumno, 
* el key del local storage es un uuid aleatorio, el mismo se va a usar para manipualr al usuario 
*/
function crearAlumno(){
    event.preventDefault(); // Evita que se envíe el formulario de manera tradicional
    var alumno = getElemsForm()
    alumno.uuid = uuidv4();
    localStorage.setItem(alumno.uuid, JSON.stringify(alumno));
    cleanElemsForm();
    alert("Datos guardados en localStorage.");
    location.reload()//Actualiza la página para ver el cambio
}

/*
*Funcion para obtener todos los alumnos almacenados en localStorage
*/
function readAllAlumnos(){
    var alumnos=[]
    for (var i = 0; i < localStorage.length; i++) {
        var clave = localStorage.key(i);
        var valor = localStorage.getItem(clave);
        alumnos.push(valor)
    }
    return alumnos
}

/*
* Funcion que muestra en el index.html una tabla con los alumnos regsitrados en el local storage
*/
function showAlumnos() {
    // Obtener los datos del localStorage
    alumnos=readAllAlumnos()
    // Verificar si hay datos en localStorage
    if (alumnos.length > 0) {
        // Header de la tabla
        var tabla_html = "  <thead style='thead-dark'><tr><th scope='col'>Correo</th><th scope='col'>Nombre</th><th scope='col'>Apellido</th><th scope='col'>Edad</th><th scope='col'>Calificación</th><th scope='col'>Editar</th><th scope='col'>Eliminar</th></tr></thead>";
        // Iterar a través de los datos y construir la representación HTML
        for (var i=0; i<alumnos.length;i++) {
            alumno=JSON.parse(alumnos[i])
            tabla_html +='<tr id='+alumno.uuid+'>';
            tabla_html +='<th>'+alumno.correo+'</th>'
            tabla_html +='<td  contenteditable="false">'+alumno.nombre+'</td>'
            tabla_html +='<td contenteditable="false">'+alumno.apellido+'</td>'
            tabla_html +='<td contenteditable="false">'+alumno.edad+'</td>'
            tabla_html +='<td contenteditable="false">'+alumno.calificacion+'</td>'
            tabla_html +='<td> <button type="button" class="btn btn-warning" onclick=editarAlumno("'+alumno.uuid+'") >Editar</button> </td>'
            tabla_html +='<td> <button type="button" class="btn btn-danger" onclick=deleteAlumno("'+alumno.uuid+'")>Eliminar</button> </td>'
            tabla_html +='</tr><br>'
        }
        // Insertar la representación HTML en el contenedor
        tabla= document.getElementById('datosAlumnos')
        tabla.innerHTML = tabla_html;        
    }
}

/*
* Funcion para eliminar un alumno con base en el parametro de su uuid, el cual es el key en local storage
*/
function deleteAlumno(uuid){   
    localStorage.removeItem(uuid)
    location.reload()
    alert("Usuario Eliminado")
}

function editarAlumno(uuid){
    
    var fila = document.getElementById(uuid);
    alumno = localStorage.getItem(uuid)
    alumno = JSON.parse(alumno)
    document.getElementById("actualizar").className = document.getElementById("guardar").className.replaceAll(" d-none", "")
    document.getElementById("guardar").className = document.getElementById("guardar").className.concat(" d-none")
    
    //Llenar el formulario con valores actuales
    document.getElementById("correo").value = alumno.correo;
    document.getElementById("nombre").value = alumno.nombre;
    document.getElementById("apellido").value = alumno.apellido;
    document.getElementById("edad").value = alumno.edad;
    document.getElementById("calificacion").value = alumno.calificacion;
    getElemsForm()

    //Nos desplazamos al formulario
    var formulario = document.getElementById("formulario");
    var formularioTop = formulario.getBoundingClientRect().top;

    // Desplaza la página hacia arriba para mostrar el formulario
    window.scrollTo({
        top: formularioTop - 20, // Puedes ajustar el valor para controlar la posición exacta
        behavior: "smooth" // Para hacer el desplazamiento suave
    });

    function esperarHastaClic() {
       return new Promise(function(resolve) {
         document.getElementById('actualizar').addEventListener('click', function() {
           resolve();
         });
       });
     }
    
    esperarHastaClic().then(function() {
         var alumno = getElemsForm()
         alumno.uuid = uuid
         localStorage.setItem(uuid, JSON.stringify(alumno));
         cleanElemsForm();
         document.getElementById("guardar").className = document.getElementById("guardar").className.replaceAll(" d-none", "")
         document.getElementById("actualizar").className = document.getElementById("guardar").className.concat(" d-none")
         alert("Datos Actualizados");
         location.reload()//Actualiza la página para ver el cambio
    });
}

//Cargar la vist de la tabla de alumnos que de vez que se recarga la pagina
window.onload = showAlumnos;


/** 
 * FUNCIONES AUXILIARES
 * Sección donde se declaran funciona auxiliares apra el CRUD
 * */

// Función para generar un UUID v4
// Funcion obtenida de internet como apoyo
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/*
*Regresa un objeto de javascript alumno con base en los datos que se encuentran escritos en el formulario
*/
function getElemsForm(){
    var correo = document.getElementById("correo").value;
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var edad = document.getElementById("edad").value;
    var calificacion = document.getElementById("calificacion").value;
    var alumno = {
            //uuid : uuid,
            correo: correo,
            nombre: nombre,
            apellido: apellido,
            edad: edad,
            calificacion: calificacion
        }; 
    return alumno ;
}

/*
* Regresa el fomrulario a un status por default 
*/
function cleanElemsForm(){
    document.getElementById("correo").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("edad").value = "";
    document.getElementById("calificacion").value = "";

}