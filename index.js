'use strict'
require('dotenv').config();

//const mongoose = require('mongoose');
var mongoose = require('mongoose');
var app = require('./app');
var port = 3000;


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/NLPDB')
    .then(() => {
        console.log('Conexión a la base de datos exitosa');

        app.listen(port, () => {
            console.log('Servidor funciona correctamente');
        });
    })
    .catch((err) => console.log(err));
    