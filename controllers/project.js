'use strict';
const { Asignatura, Usuario, Comentario } = require('../models/project');

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

    
    getUsuarios: async function(req, res){
        try {
            
            var usuarios = await Usuario.find({}); 
            if(!usuarios || usuarios.length === 0) return res.status(404).send({ message: 'No hay usuarios registrados.' });

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
    }
};

module.exports = controller;