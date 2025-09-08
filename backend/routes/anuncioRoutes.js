const express = require("express");
const router = express.Router();
const Anuncio = require("../models/Anuncio");

// Criar anúncio
router.post("/", async (req, res) => {
  try {
    const anuncio = new Anuncio(req.body);
    await anuncio.save();
    res.status(201).json(anuncio);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar anúncios
router.get("/", async (req, res) => {
  const anuncios = await Anuncio.find().populate("usuario", "nome email");
  res.json(anuncios);
});

module.exports = router;
