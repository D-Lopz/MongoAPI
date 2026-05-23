const mongoose = require("mongoose");

const docenteSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
    },
    materia: {
      type: String,
      required: [true, "La materia es obligatoria"],
      trim: true,
    },
    departamento: {
      type: String,
      trim: true,
      default: "",
    },
    // Resumen NLP actualizado automáticamente con cada evaluación
    stats: {
      totalEvaluaciones: { type: Number, default: 0 },
      sentimentPromedio: { type: Number, default: 0 },   // -1 a 1
      distribucion: {
        positivo: { type: Number, default: 0 },  // porcentaje
        neutro:   { type: Number, default: 0 },
        negativo: { type: Number, default: 0 },
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Docente", docenteSchema);
