// Página: backend/routes/anuncioRoutes.js
const express = require("express");
const router = express.Router();
const Anuncio = require("../models/Anuncio");
const multer = require("multer");

// Configuração do multer para upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Criar anúncio com upload de imagens
router.post("/", upload.array("arquivos"), async (req, res) => {
  try {
    const imagens = req.files.map((file) => file.filename);
    const anuncio = new Anuncio({ ...req.body, imagens });
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
