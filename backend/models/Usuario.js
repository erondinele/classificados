// backend/models/Usuario.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const usuarioSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, require: true },
    celular: { type: String, required: true },
    torre: { type: String, required: true },
    apartamento: { type: Number, required: true, max: 999 },
    foto: { type: String, default: "avatar.png" }, // avatar default caso não suba foto
  },
  { timestamps: true }
);

// Pré-save: criptografa a senha antes de salvar
usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("senha")) return next;
  try {
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Usuario", usuarioSchema);
