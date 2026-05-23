const express     = require("express");
const router      = express.Router();
const Evaluacion  = require("../models/Evaluacion");
const { Usuario } = require("../models/project");
const { analizarComentario } = require("../services/nlpService");

// GET /api/evaluaciones
router.get("/", async (req, res) => {
  try {
    const evaluaciones = await Evaluacion.find()
      .populate("docente", "nombre email docente")
      .sort({ createdAt: -1 })
      .limit(100);
    res.json(evaluaciones);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/evaluaciones/docente/:id
router.get("/docente/:id", async (req, res) => {
  try {
    const evaluaciones = await Evaluacion.find({ docente: req.params.id })
      .sort({ createdAt: -1 });
    res.json(evaluaciones);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/evaluaciones
router.post("/", async (req, res) => {
  try {
    const { docenteId, comentario } = req.body;

    const docente = await Usuario.findOne({
      _id: docenteId,
      rol: { $regex: /^docente$/i }
    });
    if (!docente) return res.status(404).json({ message: "Docente no encontrado" });

    const nlp = await analizarComentario(comentario);

    const evaluacion = await Evaluacion.create({ docente: docenteId, comentario, nlp });

    res.status(201).json({
      ...evaluacion.toObject(),
      docente: { _id: docente._id, nombre: docente.nombre, docente: docente.docente },
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/evaluaciones/:id
router.delete("/:id", async (req, res) => {
  try {
    const evaluacion = await Evaluacion.findByIdAndDelete(req.params.id);
    if (!evaluacion) return res.status(404).json({ message: "Evaluación no encontrada" });
    res.json({ message: "Evaluación eliminada" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
