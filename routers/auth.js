'use strict';
const express = require('express');
const router  = express.Router();
const { Usuario } = require('../models/project');

router.post('/login', async (req, res) => {
  try {
    const { email, contrasena } = req.body;
    if (!email || !contrasena)
      return res.status(400).json({ message: 'Email y contraseña requeridos.' });

    const usuario = await Usuario.findOne({ email, contrasena });
    if (!usuario)
      return res.status(401).json({ message: 'Credenciales incorrectas.' });

    // Normalizar el rol a minúscula antes de devolver
    const datos = usuario.toObject();
    datos.rol = datos.rol?.toLowerCase();
    delete datos.contrasena;

    return res.status(200).json({ usuario: datos });
  } catch (err) {
    return res.status(500).json({ message: 'Error en el servidor.' });
  }
});

module.exports = router;