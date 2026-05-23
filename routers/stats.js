const express    = require("express");
const router     = express.Router();
const Evaluacion = require("../models/Evaluacion");
const { Usuario } = require("../models/project");

// GET /api/stats
router.get("/", async (req, res) => {
  try {
    const [totalEvaluaciones, totalDocentes, sentiments] = await Promise.all([
      Evaluacion.countDocuments(),
      Usuario.countDocuments({ rol: { $regex: /^docente$/i } }),
      Evaluacion.aggregate([
        { $group: { _id: "$nlp.sentiment", count: { $sum: 1 } } },
      ]),
    ]);

    const dist = { positivo: 0, neutro: 0, negativo: 0 };
    sentiments.forEach(({ _id, count }) => {
      if (_id && dist[_id] !== undefined) {
        dist[_id] = totalEvaluaciones > 0 ? Math.round((count / totalEvaluaciones) * 100) : 0;
      }
    });

    res.json({
      totalEvaluaciones,
      totalDocentes,
      positivos: dist.positivo,
      neutros:   dist.neutro,
      negativos: dist.negativo,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/stats/tendencia
router.get("/tendencia", async (req, res) => {
  try {
    const hace30dias = new Date();
    hace30dias.setDate(hace30dias.getDate() - 30);
    const tendencia = await Evaluacion.aggregate([
      { $match: { createdAt: { $gte: hace30dias } } },
      { $group: { _id: { fecha: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, sentiment: "$nlp.sentiment" }, count: { $sum: 1 } } },
      { $sort: { "_id.fecha": 1 } },
    ]);
    res.json(tendencia);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/stats/ranking
router.get("/ranking", async (req, res) => {
  try {
    const evals = await Evaluacion.find().populate("docente", "nombre");
    const mapa = {};
    evals.forEach(e => {
      const id = e.docente?._id?.toString();
      if (!id) return;
      if (!mapa[id]) mapa[id] = { nombre: e.docente.nombre, scores: [] };
      mapa[id].scores.push(e.nlp.score);
    });
    const ranking = Object.entries(mapa).map(([id, d]) => ({
      _id: id,
      nombre: d.nombre,
      sentimentPromedio: d.scores.reduce((a,b) => a+b, 0) / d.scores.length,
      totalEvaluaciones: d.scores.length,
    })).sort((a,b) => b.sentimentPromedio - a.sentimentPromedio).slice(0,10);
    res.json(ranking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
