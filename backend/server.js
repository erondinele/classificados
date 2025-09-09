// Página: backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const anuncioRoutes = require("./routes/anuncioRoutes");

const app = express();

// Configurações
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rotas
app.use("/anuncios", anuncioRoutes);

// Conectar MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/classificados", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Erro ao conectar MongoDB:", err));

// Rodar servidor
const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
