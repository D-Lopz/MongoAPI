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

// Esquema de Evaluaciones
var EvaluacionSchema = Schema({
    fecha_inicio: Date,
    fecha_fin: Date,
    estado: String,
    descripcion: String
});

// Esquema de Mds
var MdsSchema = Schema({
    id_docente: String,
    id_asignatura: String,
    id_semestre: String
});

// Esquema de Programas
var ProgramaSchema = Schema({
    nombre_programa: String,
    codigo: String
});

// Esquema de Reportes
var ReporteSchema = Schema({
    docente: Object,
    id_docente: String,
    nombre: String,
    contenido: String,
    formato: String,
    fecha_generacion: Date
});

// Esquema de Semestres
var SemestreSchema = Schema({
    nombre_semestre: String,
    periodo: String,
    fecha_inicio: Date,
    fecha_fin: Date
});

// Exportar modelos
module.exports = {
    Usuario: mongoose.model('Usuarios', UsuariosSchema),
    Asignatura: mongoose.model('Asignatura', AsignaturaSchema),
    Comentario: mongoose.model('Comentarios', ComentariosSchema),
    Evaluacion: mongoose.model('Evaluaciones', EvaluacionSchema),
    Mds: mongoose.model('Mds', MdsSchema),
    Programa: mongoose.model('Programas', ProgramaSchema),
    Reporte: mongoose.model('Reportes', ReporteSchema),
    Semestre: mongoose.model('Semestres', SemestreSchema)
};