const express = require('express');
const router = express.Router();
const alumnosController = require('../controllers/alumnosController');

// Ruta para obtener todos los alumnos
router.get('/alumnos', alumnosController.obtenerAlumnos);
router.post('/alumnos', alumnosController.crearAlumno);

module.exports = router;
