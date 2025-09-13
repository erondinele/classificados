// backend/routes/anuncioRoutes.js
const express = require("express");
const router = express.Router();

// 1. Importando nossas ferramentas centralizadas
const upload = require("../config/multerConfig");
const authMiddleware = require("../middlewares/authMiddleware");
const anuncioController = require("../controllers/anuncioController");

// --- ROTAS ---

// Rota para Listar todos os anúncios (Pública)
router.get("/", anuncioController.getAllAnuncios);

// Rota para Criar um novo anúncio (Protegida)
// 1º - Roda o authMiddleware para verificar o token e identificar o usuário
// 2º - Roda o multer para fazer o upload dos arquivos
// 3º - Roda a função do controller para salvar os dados
router.post(
  "/",
  authMiddleware,
  upload.array("arquivos", 5), // Adicionei um limite de 5 fotos por anúncio
  anuncioController.createAnuncio
);

// Futuramente, adicionaremos mais rotas aqui (GET /:id, DELETE /:id, etc)

module.exports = router;
