// backend/routes/usuarioRoutes.js

const express = require("express");
const router = express.Router();

// Adicionado: importa a configuração centralizada do multer
const upload = require("../config/multerConfig");

// Importa o nosso controller
const usuarioController = require("../controllers/usuarioController");

// Removido: toda a lógica do multer que agora está em config/multerConfig.js
// Removido: require("multer") e require("path") que não são mais necessários aqui

// --- ROTAS AINDA MAIS LIMPAS ---

// Criar usuário (POST /)
router.post("/", upload.single("foto"), usuarioController.createUser);

// Login de usuário (POST /login)
router.post("/login", usuarioController.loginUser);

// Listar usuários (GET /)
router.get("/", usuarioController.getAllUsers);

module.exports = router;
