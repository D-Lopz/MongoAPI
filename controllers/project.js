'use strict';
const { Asignatura, Usuario, Comentario, Evaluacion, Mds, Programa, Reporte, Semestre } = require('../models/project');

var controller = {

    home: function(req, res){
        return res.status(200).send({ message: 'Soy la home' });
    },

    test: function(req, res){
        return res.status(200).send({ message: 'Metodo test' });
    },

    // CRUD Asignatura
    saveAsignatura: async function(req, res){
        try {
            var params = req.body;
            var asignatura = new Asignatura({
                nombre_asignatura: params.nombre_asignatura,
                creditos: params.creditos,
                docente: params.docente,
                id_docente: params.id_docente,
                nombre_docente: params.nombre_docente
            });

            var asignaturaStored = await asignatura.save();
            return res.status(200).send({ asignatura: asignaturaStored });
        } catch(err) {
            return res.status(500).send({ message: 'Error al guardar el documento.' });
        }
    },

    getAsignatura: async function(req, res){
        try {
            var asignaturaId = req.params.id;
            if(!asignaturaId) return res.status(404).send({ message: 'No se envió el ID.' });

            var asignatura = await Asignatura.findById(asignaturaId);
            if(!asignatura) return res.status(404).send({ message: 'No se pudo encontrar el documento.' });

            return res.status(200).send({ asignatura });
        } catch(err) {
            return res.status(500).send({ message: 'Error al devolver los datos.' });
        }
    },

    getAsignaturas: async function(req, res){
        try {
            var asignaturas = await Asignatura.find({});
            if(!asignaturas) return res.status(404).send({ message: 'No hay documentos.' });

            return res.status(200).send({ asignaturas });
        } catch(err) {
            return res.status(500).send({ message: 'Error al retornar los datos.' });
        }
    },

    updateAsignatura: async function(req, res){
        try {
            var asignaturaId = req.params.id;
            var update = req.body;

            var asignaturaUpdated = await Asignatura.findByIdAndUpdate(asignaturaId, update, { new: true });
            if(!asignaturaUpdated) return res.status(404).send({ message: 'No existe el documento.' });

            return res.status(200).send({ asignatura: asignaturaUpdated });
        } catch(err) {
            return res.status(500).send({ message: 'Error al actualizar.' });
        }
    },

    deleteAsignatura: async function(req, res){
        try {
            var asignaturaId = req.params.id;

            var asignaturaRemoved = await Asignatura.findByIdAndDelete(asignaturaId);
            if(!asignaturaRemoved) return res.status(404).send({ message: 'No existe el documento.' });

            return res.status(200).send({ asignatura: asignaturaRemoved });
        } catch(err) {
            return res.status(500).send({ message: 'Error al eliminar.' });
        }
    },

    // CRUD Usuarios
    saveUsuario: async function(req, res){
        try {
            var params = req.body;
            var usuario = new Usuario({
                nombre: params.nombre,
                email: params.email,
                rol: params.rol,
                contrasena: params.contrasena,
                fecha_creacion: new Date(),
                estudiante: params.estudiante,
                estado: params.estado,
                codigo: params.codigo,
                telefono: params.telefono,
                cuenta_social: params.cuenta_social
            });

            var usuarioStored = await usuario.save();
            return res.status(200).send({ usuario: usuarioStored });
        } catch(err) {
            return res.status(500).send({ message: 'Error al guardar el usuario.' });
        }
    },


    getUsuario: async function(req, res){
        try {
            var usuarioId = req.params.id;
            
            if(!usuarioId) return res.status(404).send({ message: 'No se envió el ID.' });

            var usuario = await Usuario.findById(usuarioId);
            if(!usuario) return res.status(404).send({ message: 'No se pudo encontrar el usuario.' });

            return res.status(200).send({ usuario });
        } catch(err) {
            return res.status(500).send({ message: 'Error al devolver los datos.' });
        }
    },

    
  getUsuarios: async function(req, res) {
    try {
        var query = {};
        if (req.query.rol) query.rol = req.query.rol;

        var usuarios = await Usuario.find(query);
        if (!usuarios || usuarios.length === 0)
            return res.status(404).send({ message: 'No hay usuarios registrados.' });

        return res.status(200).send({ usuarios });
    } catch(err) {
        return res.status(500).send({ message: 'Error al retornar los datos.' });
    }
},

    updateUsuario: async function(req, res){
        try {
            var usuarioId = req.params.id;
            var update = req.body;

            var usuarioUpdated = await Usuario.findByIdAndUpdate(usuarioId, update, { new: true });
            if(!usuarioUpdated) return res.status(404).send({ message: 'No existe el documento.' });

            return res.status(200).send({ usuario: usuarioUpdated });
        } catch(err) {
            return res.status(500).send({ message: 'Error al actualizar.' });
        }
    },

    deleteUsuario: async function(req, res){
        try {
            var usuarioId = req.params.id;

            var usuarioRemoved = await Usuario.findByIdAndDelete(usuarioId);
            if(!usuarioRemoved) return res.status(404).send({ message: 'No existe el usuario.' });

            return res.status(200).send({ usuario: usuarioRemoved });
        } catch(err) {
            return res.status(500).send({ message: 'Error al eliminar.' });
        }
    },

    // CRUD Comentarios
    saveComentario: async function(req, res){
        try {
            var params = req.body;
            var comentario = new Comentario({
                estudiante: params.estudiante,
                id_estudiante: params.id_estudiante,
                nombre: params.nombre,
                docente: params.docente,
                id_docente: params.id_docente,
                nombre: params.nombre,
                asignatura: params.asignatura,
                id_asignatura: params.id_asignatura,
                nombre: params.nombre,
                comentario: params.comentario,
                sentimiento: params.sentimiento,
                promedio: params.promedio,
                fecha_creacion: new Date(),
                analisis: params.analisis,
                sentimiento: params.sentimiento,
                resumen: params.resumen,
                puntuacion: params.puntuacion
            });

            var comentarioStored = await comentario.save();
            return res.status(200).send({ comentario: comentarioStored });
        } catch(err) {
            return res.status(500).send({ message: 'Error al guardar el comentario.' });
        }
    },


    getComentario: async function(req, res){
        try {
            var comentarioId = req.params.id;
            
            if(!comentarioId) return res.status(404).send({ message: 'No se envió el ID.' });

            var comentario = await Comentario.findById(comentarioId);
            if(!comentario) return res.status(404).send({ message: 'No se pudo encontrar el comentario.' });

            return res.status(200).send({ comentario });
        } catch(err) {
            return res.status(500).send({ message: 'Error al devolver los datos.' });
        }
    },

    
    getComentarios: async function(req, res){
        try {
            
            var comentarios = await Comentario.find({}); 
            if(!comentarios || comentarios.length === 0) return res.status(404).send({ message: 'No hay comentarios registrados.' });

            return res.status(200).send({ comentarios });
        } catch(err) {
            return res.status(500).send({ message: 'Error al retornar los comentarios.' });
        }
    },

    updateComentario: async function(req, res){
        try {
            var comentarioId = req.params.id;
            var update = req.body;

            var comentarioUpdated = await Comentario.findByIdAndUpdate(comentarioId, update, { new: true });
            if(!comentarioUpdated) return res.status(404).send({ message: 'No existe el comentario.' });

            return res.status(200).send({ comentario: comentarioUpdated });
        } catch(err) {
            return res.status(500).send({ message: 'Error al actualizar.' });
        }
    },

    deleteComentario: async function(req, res){
        try {
            var comentarioId = req.params.id;

            var comentarioRemoved = await Comentario.findByIdAndDelete(comentarioId);
            if(!comentarioRemoved) return res.status(404).send({ message: 'No existe el comentario.' });

            return res.status(200).send({ comentario: comentarioRemoved });
        } catch(err) {
            return res.status(500).send({ message: 'Error al eliminar.' });
        }
    },

    // CRUD Evaluaciones
    saveEvaluacion: async function(req, res){
        try {
            var params = req.body;
            var evaluacion = new Evaluacion({
                fecha_inicio: params.fecha_inicio,
                fecha_fin: params.fecha_fin,
                estado: params.estado,
                descripcion: params.descripcion
            });

            var evaluacionStored = await evaluacion.save();
            return res.status(200).send({ evaluacion: evaluacionStored });
        } catch(err) {
            return res.status(500).send({ message: 'Error al guardar la evaluación.' });
        }
    },


    getEvaluacion: async function(req, res){
        try {
            var evaluacionId = req.params.id;
            
            if(!evaluacionId) return res.status(404).send({ message: 'No se envió el ID.' });

            var evaluacion = await Evaluacion.findById(evaluacionId);
            if(!evaluacion) return res.status(404).send({ message: 'No se pudo encontrar la evaluación.' });

            return res.status(200).send({ evaluacion });
        } catch(err) {
            return res.status(500).send({ message: 'Error al devolver las evaluaciones.' });
        }
    },

    
    getEvaluaciones: async function(req, res){
        try {
            
            var evaluaciones = await Evaluacion.find({}); 
            if(!evaluaciones || evaluaciones.length === 0) return res.status(404).send({ message: 'No hay evaluaciones registradas.' });

            return res.status(200).send({ evaluaciones });
        } catch(err) {
            return res.status(500).send({ message: 'Error al retornar las evaluaciones.' });
        }
    },

    updateEvaluacion: async function(req, res){
        try {
            var evaluacionId = req.params.id;
            var update = req.body;

            var evaluacionUpdated = await Evaluacion.findByIdAndUpdate(evaluacionId, update, { new: true });
            if(!evaluacionUpdated) return res.status(404).send({ message: 'No existe la evaluación.' });

            return res.status(200).send({ evaluacion: evaluacionUpdated });
        } catch(err) {
            return res.status(500).send({ message: 'Error al actualizar.' });
        }
    },

    deleteEvaluacion: async function(req, res){
        try {
            var evaluacionId = req.params.id;

            var evaluacionRemoved = await Evaluacion.findByIdAndDelete(evaluacionId);
            if(!evaluacionRemoved) return res.status(404).send({ message: 'No existe la evaluación.' });

            return res.status(200).send({ evaluacion: evaluacionRemoved });
        } catch(err) {
            return res.status(500).send({ message: 'Error al eliminar la evaluación.' });
        }
    },

    // CRUD mds
    saveMds: async function(req, res){
        try {
            var params = req.body;
            var mds = new Mds({
                id_docente: params.id_docente,
                id_asignatura: params.id_asignatura,
                id_semestre: params.id_semestre
            });

            var mdsStored = await mds.save();
            return res.status(200).send({ mds: mdsStored });
        } catch(err) {
            return res.status(500).send({ message: 'Error al guardar el mds.' });
        }
    },


    getMds: async function(req, res){
        try {
            var mdsId = req.params.id;
            
            if(!mdsId) return res.status(404).send({ message: 'No se envió el ID.' });

            var mds = await Mds.findById(mdsId);
            if(!mds) return res.status(404).send({ message: 'No se pudo encontrar el mds.' });

            return res.status(200).send({ mds });
        } catch(err) {
            return res.status(500).send({ message: 'Error al devolver los mds.' });
        }
    },

    
    getMdss: async function(req, res){
        try {
            
            var mdss = await Mds.find({}); 
            if(!mdss || mdss.length === 0) return res.status(404).send({ message: 'No hay mds registrados.' });

            return res.status(200).send({ mdss });
        } catch(err) {
            return res.status(500).send({ message: 'Error al retornar los mds.' });
        }
    },

    updateMds: async function(req, res){
        try {
            var mdsId = req.params.id;
            var update = req.body;

            var mdsUpdated = await Mds.findByIdAndUpdate(mdsId, update, { new: true });
            if(!mdsUpdated) return res.status(404).send({ message: 'No existe el mds.' });

            return res.status(200).send({ mds: mdsUpdated });
        } catch(err) {
            return res.status(500).send({ message: 'Error al actualizar.' });
        }
    },

    deleteMds: async function(req, res){
        try {
            var mdsId = req.params.id;

            var mdsRemoved = await Mds.findByIdAndDelete(mdsId);
            if(!mdsRemoved) return res.status(404).send({ message: 'No existe el mds.' });

            return res.status(200).send({ mds: mdsRemoved });
        } catch(err) {
            return res.status(500).send({ message: 'Error al eliminar el mds.' });
        }
    },

    // CRUD programas
    savePrograma: async function(req, res){
        try {
            var params = req.body;
            var programa = new Programa({
                nombre_programa: params.nombre_programa,
                codigo: params.codigo
            });

            var programaStored = await programa.save();
            return res.status(200).send({ programa: programaStored });
        } catch(err) {
            return res.status(500).send({ message: 'Error al guardar el programa.' });
        }
    },


    getPrograma: async function(req, res){
        try {
            var programaId = req.params.id;
            
            if(!programaId) return res.status(404).send({ message: 'No se envió el ID.' });

            var programa = await Programa.findById(programaId);
            if(!programa) return res.status(404).send({ message: 'No se pudo encontrar el programa.' });

            return res.status(200).send({ programa });
        } catch(err) {
            return res.status(500).send({ message: 'Error al devolver los programas.' });
        }
    },

    
    getProgramas: async function(req, res){
        try {
            
            var programas = await Programa.find({}); 
            if(!programas || programas.length === 0) return res.status(404).send({ message: 'No hay programas registrados.' });

            return res.status(200).send({ programas });
        } catch(err) {
            return res.status(500).send({ message: 'Error al retornar los programas.' });
        }
    },

    updatePrograma: async function(req, res){
        try {
            var programaId = req.params.id;
            var update = req.body;

            var programaUpdated = await Programa.findByIdAndUpdate(programaId, update, { new: true });
            if(!programaUpdated) return res.status(404).send({ message: 'No existe el programa.' });

            return res.status(200).send({ programa: programaUpdated });
        } catch(err) {
            return res.status(500).send({ message: 'Error al actualizar.' });
        }
    },

    deletePrograma: async function(req, res){
        try {
            var programaId = req.params.id;

            var programaRemoved = await Programa.findByIdAndDelete(programaId);
            if(!programaRemoved) return res.status(404).send({ message: 'No existe el programa.' });

            return res.status(200).send({ programa: programaRemoved });
        } catch(err) {
            return res.status(500).send({ message: 'Error al eliminar el programa.' });
        }
    },

    // CRUD Reportes
    saveReporte: async function(req, res){
        try {
            var params = req.body;
            var reporte = new Reporte({
                docente: params.docente,
                id_docente: params.id_docente,
                nombre: params.nombre,
                contenido: params.contenido,
                formato: params.formato,
                fecha_generacion: params.fecha_generacion
            });

            var reporteStored = await reporte.save();
            return res.status(200).send({ reporte: reporteStored });
        } catch(err) {
            return res.status(500).send({ message: 'Error al guardar el reporte.' });
        }
    },


    getReporte: async function(req, res){
        try {
            var reporteId = req.params.id;
            
            if(!reporteId) return res.status(404).send({ message: 'No se envió el ID.' });

            var reporte = await Reporte.findById(reporteId);
            if(!reporte) return res.status(404).send({ message: 'No se pudo encontrar el reporte.' });

            return res.status(200).send({ reporte });
        } catch(err) {
            return res.status(500).send({ message: 'Error al devolver los reportes.' });
        }
    },

    
    getReportes: async function(req, res){
        try {
            
            var reportes = await Reporte.find({}); 
            if(!reportes || reportes.length === 0) return res.status(404).send({ message: 'No hay reportes registrados.' });

            return res.status(200).send({ reportes });
        } catch(err) {
            return res.status(500).send({ message: 'Error al retornar los reportes.' });
        }
    },

    updateReporte: async function(req, res){
        try {
            var reporteId = req.params.id;
            var update = req.body;

            var reporteUpdated = await Reporte.findByIdAndUpdate(reporteId, update, { new: true });
            if(!reporteUpdated) return res.status(404).send({ message: 'No existe el reporte.' });

            return res.status(200).send({ reporte: reporteUpdated });
        } catch(err) {
            return res.status(500).send({ message: 'Error al actualizar.' });
        }
    },

    deleteReporte: async function(req, res){
        try {
            var reporteId = req.params.id;

            var reporteRemoved = await Reporte.findByIdAndDelete(reporteId);
            if(!reporteRemoved) return res.status(404).send({ message: 'No existe el reporte.' });

            return res.status(200).send({ reporte: reporteRemoved });
        } catch(err) {
            return res.status(500).send({ message: 'Error al eliminar el reporte.' });
        }
    },

    // CRUD Semestres
    saveSemestre: async function(req, res){
        try {
            var params = req.body;
            var semestre = new Semestre({
                nombre_semestre: params.nombre_semestre,
                periodo: params.periodo,
                fecha_inicio: params.fecha_inicio,
                fecha_fin: params.fecha_fin
            });

            var semestreStored = await semestre.save();
            return res.status(200).send({ semestre: semestreStored });
        } catch(err) {
            return res.status(500).send({ message: 'Error al guardar el semestre.' });
        }
    },


    getSemestre: async function(req, res){
        try {
            var semestreId = req.params.id;
            
            if(!semestreId) return res.status(404).send({ message: 'No se envió el ID.' });

            var semestre = await Semestre.findById(semestreId);
            if(!semestre) return res.status(404).send({ message: 'No se pudo encontrar el semestre.' });

            return res.status(200).send({ semestre });
        } catch(err) {
            return res.status(500).send({ message: 'Error al devolver los semestres.' });
        }
    },

    
    getSemestres: async function(req, res){
        try {
            
            var semestres = await Semestre.find({}); 
            if(!semestres || semestres.length === 0) return res.status(404).send({ message: 'No hay semestres registrados.' });

            return res.status(200).send({ semestres });
        } catch(err) {
            return res.status(500).send({ message: 'Error al retornar los semestres.' });
        }
    },

    updateSemestre: async function(req, res){
        try {
            var semestreId = req.params.id;
            var update = req.body;

            var semestreUpdated = await Semestre.findByIdAndUpdate(semestreId, update, { new: true });
            if(!semestreUpdated) return res.status(404).send({ message: 'No existe el semestre.' });

            return res.status(200).send({ semestre: semestreUpdated });
        } catch(err) {
            return res.status(500).send({ message: 'Error al actualizar.' });
        }
    },

    deleteSemestre: async function(req, res){
        try {
            var semestreId = req.params.id;

            var semestreRemoved = await Semestre.findByIdAndDelete(semestreId);
            if(!semestreRemoved) return res.status(404).send({ message: 'No existe el semestre.' });

            return res.status(200).send({ semestre: semestreRemoved });
        } catch(err) {
            return res.status(500).send({ message: 'Error al eliminar el semestre.' });
        }
    }
};

module.exports = controller;