const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const usuarioRoutes = require("./routes/usuarioRoutes");
const anuncioRoutes = require("./routes/anuncioRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/anuncios", anuncioRoutes);

// Conexão com MongoDB
mongoose
  .connect("mongodb://localhost:27017/todoDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.log(err));

// Teste de rota
app.get("/", (req, res) => res.send("API rodando!"));

app.listen(5000, () => console.log("Servidor rodando na porta 5000"));
