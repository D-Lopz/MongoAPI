'use strict';
const express    = require('express');
const router     = express.Router();
const { Usuario } = require('../models/project');
const Evaluacion = require('../models/Evaluacion');

// GET /api/docentes
router.get('/', async (req, res) => {
  try {
    const docentes = await Usuario.find({ rol: { $regex: /^docente$/i } }).select('-contrasena');

    // Contar evaluaciones y calcular score promedio por docente
    const counts = await Evaluacion.aggregate([
      { $group: { _id: "$docente", total: { $sum: 1 }, scorePromedio: { $avg: "$nlp.score" },
          pos: { $sum: { $cond: [{ $eq: ["$nlp.sentiment","positivo"] }, 1, 0] } },
          neg: { $sum: { $cond: [{ $eq: ["$nlp.sentiment","negativo"] }, 1, 0] } },
          neu: { $sum: { $cond: [{ $eq: ["$nlp.sentiment","neutro"]   }, 1, 0] } },
      }}
    ]);
    const countMap = {};
    counts.forEach(c => { countMap[c._id?.toString()] = c; });

    const result = docentes.map(d => {
      const s = countMap[d._id.toString()];
      const total = s?.total ?? 0;
      return {
        ...d.toObject(),
        stats: {
          totalEvaluaciones: total,
          sentimentPromedio: parseFloat((s?.scorePromedio ?? 0).toFixed(4)),
          distribucion: {
            positivo: total > 0 ? Math.round((s.pos/total)*100) : 0,
            neutro:   total > 0 ? Math.round((s.neu/total)*100) : 0,
            negativo: total > 0 ? Math.round((s.neg/total)*100) : 0,
          }
        }
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/docentes/:id
router.get('/:id', async (req, res) => {
  try {
    const docente = await Usuario.findById(req.params.id).select('-contrasena');
    if (!docente) return res.status(404).json({ message: 'Docente no encontrado' });
    res.json(docente);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/docentes
router.post('/', async (req, res) => {
  try {
    const { nombre, email, contrasena, docente } = req.body;
    const nuevo = await Usuario.create({
      nombre, email, contrasena: contrasena || "123",
      rol: 'Docente',
      docente: docente || {},
      fecha_creacion: new Date()
    });
    const { contrasena: _, ...datos } = nuevo.toObject();
    res.status(201).json(datos);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/docentes/:id
router.put('/:id', async (req, res) => {
  try {
    const { nombre, email, docente } = req.body;
    const updated = await Usuario.findByIdAndUpdate(
      req.params.id, { nombre, email, docente }, { new: true }
    ).select('-contrasena');
    if (!updated) return res.status(404).json({ message: 'Docente no encontrado' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/docentes/:id
router.delete('/:id', async (req, res) => {
  try {
    const docente = await Usuario.findByIdAndDelete(req.params.id);
    if (!docente) return res.status(404).json({ message: 'Docente no encontrado' });
    res.json({ message: 'Docente eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;