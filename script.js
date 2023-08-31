// Función para manejar el envío del formulario
function crearAlumno(){
    console.log("crearAlumno")
   
    event.preventDefault(); // Evita que se envíe el formulario de manera tradicional
    // Obtiene los valores de los campos
    var alumno = getElemsForm()
    alumno.uuid = uuidv4();
    localStorage.setItem(alumno.uuid, JSON.stringify(alumno));
    cleanElemsForm();

    alert("Datos guardados en localStorage.");
    location.reload()//Actualiza la página para ver el cambio
    
}

//Funcion para obtener todos los alumnos almacenados en localStorage
function readAllAlumnos(){
    console.log("readAllAlumnoa")

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
            tabla_html +='<tr id='+alumno.uuid+'>';
            tabla_html +='<th>'+alumno.correo+'</th>'
            tabla_html +='<td  contenteditable="false">'+alumno.nombre+'</td>'
            tabla_html +='<td contenteditable="false">'+alumno.apellido+'</td>'
            tabla_html +='<td contenteditable="false">'+alumno.edad+'</td>'
            tabla_html +='<td contenteditable="false">'+alumno.calificacion+'</td>'
            tabla_html +='<td> <button type="button" class="btn btn-info" onclick=editarAlumno("'+alumno.uuid+'") >Editar</button> </td>'
            tabla_html +='<td> <button type="button" class="btn btn-danger" onclick=deleteAlumno("'+alumno.uuid+'")>Eliminar</button> </td>'
            tabla_html +='</tr><br>'
        }
        // Insertar la representación HTML en el contenedor
        tabla= document.getElementById('datosAlumnos')
        tabla.innerHTML = tabla_html;        
    }
}

function deleteAlumno(uuid){   
    localStorage.removeItem(uuid)
    location.reload()
    alert("Usuario Eliminado")
}

function editarAlumno(uuid){
     console.log("editarAlunmo")
   
    var fila = document.getElementById(uuid);
    alumno = localStorage.getItem(uuid)
    alumno = JSON.parse(alumno)
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
     console.log('Esperando a que se haga clic en el botón "Actualizar" para editar al alumno...');

    esperarHastaClic().then(function() {
         console.log('El botón "Actualizar" ha sido oprimido. Realizar la edición del alumno aquí.');
         var alumno = getElemsForm()
         localStorage.setItem(uuid, JSON.stringify(alumno));
         cleanElemsForm();
         document.getElementById("guardar").className = document.getElementById("guardar").className.replace(" d-none", "")
         alert("Datos Actualizados");
         location.reload()//Actualiza la página para ver el cambio

    
    });
}

function actualizarAlumno(){
    localStorage.setItem(alumno.uuid, JSON.stringify(alumno));
    alumno = getElemsForm()    


}

window.onload = showAlumnos;
/** 
 * FUNCIONES AUXILIARES
 * 
 * */
function alumnoExist(correo){
    console.log("alumnoExist")
    
    console.log(correo)
    console.log(localStorage.getItem(correo))
    if (localStorage.getItem(correo) == null){
        return false
    }
    return true
}

// Función para generar un UUID v4
// Funcion obtenida de internet como apoyo
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

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

function cleanElemsForm(){
    document.getElementById("correo").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("edad").value = "";
    document.getElementById("calificacion").value = "";

}