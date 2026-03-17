'use strict';
const project = require('../models/project');
var Proejct = require('../models/project');
var controller = {
    home: function(req, res){
        return res.status(200).send({
            message: 'Soy la home'
        });
    },

    test: function(req, res){
        return res.status(200).send({
            message: 'Metodo test'
        });
    },

    saveProject: function(req, res){
        var project = new Proejct();

        var params = req.body;

        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;

        project.save((err, projectStored) => {
            if(err) return res.status(500).send({message: 'Error al guardar el documento.'});
            if(!projectStored) return res.status(404).send({message: 'No se ha podido guardar el proyecto.'});

            return res.status(200).send({project: projectStored});
        });
    },

    getProject: function(req, res){
        var projectId = req.params.id;
        if(projectId == null) return res.status(404).send({message: 'No se pudo encontrar el documento.'});

        Proejct.findById(projectId, (err, project) => {
            if(err) return res.status(500).send({message: 'Error al devolver los datos.'});
            if(!project) return res.status(404).send({message: 'No se pudo encontrar el documento.'});
            return res.status(200).send({project});
        });
    },

    getProjects: function(req, res){
        project.find({}).exec((err, projects) => {
            if(err) return res.status(500).send({message: 'Error al retornar los datos.'});
            if(!projects) return res.status(404).send({message: 'No hay documentos.'});
            return res.status(200).send({projects});
        });
    },

    updateProject: function(req, res){
        var projectId = req.params.id;
        var update = req.body;

        project.findByIdAndUpdate(projectId, update, (err, projectUpdated) => {
            if(err) return res.status(500).send({message: 'Error al actualizar.'});
            if(!projectUpdated) return res.status(404).send({message: 'No existe el documento.'});
            return res.status(200).send({project: projectUpdated});
        });
    },

    deleteProject: function(req, res){
        var projectId = req.params.id;

        Proejct.findByIdAndRemove(projectId, (err, projectRemoved) => {
            if(err) return res.status(500).send({message: 'Error al eliminar.'});
            if(!projectRemoved) return res.status(404).send({message: 'No existe el documento.'});
            return res.status(200).send({project: projectRemoved});
        });
    }
};

module.exports = controller;