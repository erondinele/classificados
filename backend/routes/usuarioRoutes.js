// Arquivo: backend/routes/usuarioRoutes.js
const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuario");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Registrar usuário
router.post("/register", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const usuario = new Usuario({ nome, email, senha });
    await usuario.save();
    res.status(201).json({ message: "Usuário criado!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login usuário
router.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  const usuario = await Usuario.findOne({ email });
  if (!usuario)
    return res.status(400).json({ error: "Usuário não encontrado" });

  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) return res.status(400).json({ error: "Senha inválida" });

  const token = jwt.sign({ id: usuario._id }, "seu_segredo", {
    expiresIn: "1d",
  });
  res.json({ token });
});

module.exports = router;
