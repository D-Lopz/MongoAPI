'use strict';
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
    }
};

module.exports = controller;