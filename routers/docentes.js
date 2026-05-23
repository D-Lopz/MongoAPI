'use strict';
const express  = require('express');
const router   = express.Router();
const { Usuario } = require('../models/project');

// GET /api/docentes — listar todos los usuarios con rol Docente
router.get('/', async (req, res) => {
  try {
    const docentes = await Usuario.find({ 
      rol: { $regex: /^docente$/i }  // insensible a mayúsculas
    }).select('-contrasena');
    res.json(docentes);
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
    const { nombre, email, contrasena, docente, departamento } = req.body;
    const nuevo = await Usuario.create({
      nombre, email, contrasena,
      rol: 'Docente',
      docente: docente || { titulo: departamento || '' },
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
      req.params.id,
      { nombre, email, docente },
      { new: true }
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