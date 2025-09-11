// backend/routes/usuarioRoutes.js
const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuario");
const multer = require("multer");
const path = require("path");

// Configuração do multer para upload de fotos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  },
});
const upload = multer({ storage });

// Criar usuário
router.post("/", upload.single("foto"), async (req, res) => {
  try {
    const { nome, email, senha, celular, torre, apartamento } = req.body;
    let foto = req.file ? req.file.filename : "avatar.png";

    const usuario = new Usuario({
      nome,
      email,
      senha,
      celular,
      torre,
      apartamento,
      foto,
    });
    await usuario.save();
    res.status(201).json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar usuários (opcional para testes)
router.get("/", async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
