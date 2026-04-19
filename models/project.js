'use strict';

var mongoose= require('mongoose');
var Schema = mongoose.Schema;

// Esquema de Asignatura
var AsignaturaSchema = Schema({
    nombre_asignatura: String,
    creditos: Number,
    docente: Object,
    id_docente: Number,
    nombre_docente: String,
});

// Esquema de Usuarios
var UsuariosSchema = Schema({
    nombre: String,
    email: String,
    rol: String,
    contrasena: String,
    fecha_creacion: Date,
    estudiante: Object,
    estado: String,
    codigo: String,
    telefono: String,
    cuenta_social: String,
});

//Esquema de Comentarios
var ComentariosSchema = Schema({
    estudante: Object,
    id_estudiante: String, 
    nombre: String,
    docente: Object,
    id_docente: String,
    nombre_docente: String,
    asignatura: Object,
    id_asignatura: String,
    nombre: String,
    comentario: String,
    sentimiento: String,
    promedio: Number,
    fecha_creacion: Date,
    analisis: Object,
    sentimiento: String,
    resumen: String,
    puntuacion: Number
});
// Exportar modelos

module.exports = {
    Usuario: mongoose.model('Usuarios', UsuariosSchema),
    Asignatura: mongoose.model('Asignatura', AsignaturaSchema),
    Comentario: mongoose.model('Comentarios', ComentariosSchema)
};