const mongoose = require("mongoose");

const AnuncioSchema = new mongoose.Schema({
  titulo: String,
  descricao: String,
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
  criadoEm: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Anuncio", AnuncioSchema);
