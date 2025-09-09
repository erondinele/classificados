// Página: backend/models/Anuncio.js
const mongoose = require("mongoose");

const AnuncioSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: { type: String },
  preco: { type: Number, required: true },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
  imagens: [{ type: String }], // Array de nomes de arquivos
});

module.exports = mongoose.model("Anuncio", AnuncioSchema);
