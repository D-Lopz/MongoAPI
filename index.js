'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio')
    .then(() => {
        console.log('Conexión a la base de datos establecida');

        app.listen(port, () => {
            console.log('Servidor funciona correctamente');
    })
    .catch((err) => {
        console.error('Error al conectar a la base de datos:', err);
    })});