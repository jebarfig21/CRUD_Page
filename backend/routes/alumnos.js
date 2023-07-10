const obtenerAlumnos = (req, res) => {
  // Lógica para obtener los alumnos desde la base de datos o el almacenamiento local
  // ...
  // Devolver los alumnos en la respuesta
  res.json({ alumnos: [...alumnos] });
};

module.exports = {
  obtenerAlumnos
};

const crearAlumno = (req, res) => {
  // Lógica para obtener los alumnos desde la base de datos o el almacenamiento local
  // ...
  // Devolver los alumnos en la respuesta
  localStorage.setItem(clave, JSON.stringify(valor));

};

module.exports = {
  crearAlumno
};
