const mongoose = require("mongoose");

const evaluacionSchema = new mongoose.Schema(
  {
    docente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuarios",   // ← era "Docente", ahora apunta a la colección correcta
      required: true,
    },
    comentario: {
      type: String,
      required: [true, "El comentario es obligatorio"],
      minlength: [10, "El comentario debe tener al menos 10 caracteres"],
      maxlength: [500, "El comentario no puede superar los 500 caracteres"],
      trim: true,
    },
    nlp: {
      sentiment: { type: String, enum: ["positivo", "negativo", "neutro"], required: true },
      score:     { type: Number, required: true },
      confianza: { type: Number, required: true },
      keywords:  [{ type: String }],
      razon:     { type: String, default: "" },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Evaluacion", evaluacionSchema);
