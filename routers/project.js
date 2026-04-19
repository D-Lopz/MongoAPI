'use strict';

var express = require('express');
var ProjectController = require('../controllers/project');

var router = express.Router();

router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);

// ------------------ CRUD Asignaturas ------------------
// POST
router.post('/save-asignatura', ProjectController.saveAsignatura);

// GET
router.get('/asignatura', ProjectController.getAsignatura);
router.get('/asignatura/:id', ProjectController.getAsignatura);

router.get('/asignaturas', ProjectController.getAsignaturas);

// PUT
router.put('/edit-asignatura', ProjectController.updateAsignatura);
router.put('/edit-asignatura/:id', ProjectController.updateAsignatura);

// DELETE
router.delete('/delete-asignatura', ProjectController.deleteAsignatura);
router.delete('/delete-asignatura/:id', ProjectController.deleteAsignatura);

// ------------------ CRUD Usuarios ---------------------
// POST 
router.post('/save-usuario', ProjectController.saveUsuario);

// GET
router.get('/usuario', ProjectController.getUsuario);
router.get('/usuario/:id', ProjectController.getUsuario);

router.get('/usuarios', ProjectController.getUsuarios);

// PUT
router.put('/edit-usuario', ProjectController.updateUsuario);
router.put('/edit-usuario/:id', ProjectController.updateUsuario);

// DELETE
router.delete('/delete-usuario', ProjectController.deleteUsuario);
router.delete('/delete-usuario/:id', ProjectController.deleteUsuario);

// ------------------ CRUD Comentarios ---------------------
// POST
router.post('/save-comentario', ProjectController.saveComentario);

// GET
router.get('/comentario', ProjectController.getComentario);
router.get('/comentario/:id', ProjectController.getComentario);

router.get('/comentarios', ProjectController.getComentarios);

// PUT
router.put('/edit-comentario', ProjectController.updateComentario);
router.put('/edit-comentario/:id', ProjectController.updateComentario);

// DELETE
router.delete('/delete-comentario', ProjectController.deleteComentario);
router.delete('/delete-comentario/:id', ProjectController.deleteComentario);

//

module.exports = router;