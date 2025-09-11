// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Conectar ao MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/classificados", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Rotas
const anuncioRoutes = require("./routes/anuncioRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");

app.use("/anuncios", anuncioRoutes);
app.use("/usuarios", usuarioRoutes);

// Rodar servidor
const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
