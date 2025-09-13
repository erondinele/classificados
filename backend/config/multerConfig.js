// backend/config/multerConfig.js

const multer = require("multer");
const path = require("path");

// Define o local de armazenamento e o nome do arquivo
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // A pasta 'uploads' deve existir na raiz do seu projeto backend
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Garante um nome de arquivo único adicionando a data atual e a extensão original
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  },
});

// Inicializa o multer com a configuração de storage
const upload = multer({ storage });

// Exporta a instância do 'upload' configurada
module.exports = upload;
