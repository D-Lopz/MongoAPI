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

// ------------------ CRUD Evaluaciones ---------------------

// POST
router.post('/save-evaluacion', ProjectController.saveEvaluacion);

// GET
router.get('/evaluacion', ProjectController.getEvaluacion);
router.get('/evaluacion/:id', ProjectController.getEvaluacion);

router.get('/evaluaciones', ProjectController.getEvaluaciones);

// PUT
router.put('/edit-evaluacion', ProjectController.updateEvaluacion);
router.put('/edit-evaluacion/:id', ProjectController.updateEvaluacion);

// DELETE
router.delete('/delete-evaluacion', ProjectController.deleteEvaluacion);
router.delete('/delete-evaluacion/:id', ProjectController.deleteEvaluacion);

// ------------------ CRUD mds ---------------------

// POST
router.post('/save-mds', ProjectController.saveMds);

// GET
router.get('/mds', ProjectController.getMds);
router.get('/mds/:id', ProjectController.getMds);

router.get('/mdss', ProjectController.getMdss);

// PUT
router.put('/edit-mds', ProjectController.updateMds);
router.put('/edit-mds/:id', ProjectController.updateMds);

// DELETE
router.delete('/delete-mds', ProjectController.deleteMds);
router.delete('/delete-mds/:id', ProjectController.deleteMds);

// ------------------ CRUD programas ---------------------

// POST
router.post('/save-programa', ProjectController.savePrograma);

// GET
router.get('/programa', ProjectController.getPrograma);
router.get('/programa/:id', ProjectController.getPrograma);

router.get('/programas', ProjectController.getProgramas);

// PUT
router.put('/edit-programa', ProjectController.updatePrograma);
router.put('/edit-programa/:id', ProjectController.updatePrograma);

// DELETE
router.delete('/delete-programa', ProjectController.deletePrograma);
router.delete('/delete-programa/:id', ProjectController.deletePrograma);

// ------------------ CRUD Reportes ---------------------

// POST
router.post('/save-reporte', ProjectController.saveReporte);

// GET
router.get('/reporte', ProjectController.getReporte);
router.get('/reporte/:id', ProjectController.getReporte);

router.get('/reportes', ProjectController.getReportes);

// PUT
router.put('/edit-reporte', ProjectController.updateReporte);
router.put('/edit-reporte/:id', ProjectController.updateReporte);

// DELETE
router.delete('/delete-reporte', ProjectController.deleteReporte);
router.delete('/delete-reporte/:id', ProjectController.deleteReporte);

// ------------------ CRUD Semestres ---------------------

// POST
router.post('/save-semestre', ProjectController.saveSemestre);

// GET
router.get('/semestre', ProjectController.getSemestre);
router.get('/semestre/:id', ProjectController.getSemestre);

router.get('/semestres', ProjectController.getSemestres);

// PUT
router.put('/edit-semestre', ProjectController.updateSemestre);
router.put('/edit-semestre/:id', ProjectController.updateSemestre);

// DELETE
router.delete('/delete-semestre', ProjectController.deleteSemestre);
router.delete('/delete-semestre/:id', ProjectController.deleteSemestre);

// ------------------ Rutas adicionales ---------------------

// Obtener comentarios por docente
router.get('/comentarios-docente/:id_docente', ProjectController.getComentariosByDocente);

// Obtener comentarios por asignatura
router.get('/comentarios-asignatura/:id_asignatura', ProjectController.getComentariosByAsignatura);

// Obtener comentarios por semestre
router.get('/comentarios-semestre/:id_semestre', ProjectController.getComentariosBySemestre);

// Obtener reportes por docente
router.get('/reportes-docente/:id_docente', ProjectController.getReportesByDocente);

// Obtener reportes por asignatura
router.get('/reportes-asignatura/:id_asignatura', ProjectController.getReportesByAsignatura);

// Obtener reportes por semestre
router.get('/reportes-semestre/:id_semestre', ProjectController.getReportesBySemestre);

// Obtener asignaturas por programa
router.get('/asignaturas-programa/:codigo_programa', ProjectController.getAsignaturasByPrograma);

// Obtener docentes por asignatura
router.get('/docentes-asignatura/:id_asignatura', ProjectController.getDocentesByAsignatura);

// Obtener asignaturas por docente
router.get('/asignaturas-docente/:id_docente', ProjectController.getAsignaturasByDocente);

//Exportar router
module.exports = router;