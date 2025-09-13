// backend/controllers/usuarioController.js

const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const usuarioController = {
  // 1. Lógica para CRIAR um novo usuário
  createUser: async (req, res) => {
    try {
      const { nome, email, senha, celular, torre, apartamento } = req.body;
      let foto = req.file ? req.file.filename : "avatar.png";

      // --- MELHORIA DE SEGURANÇA CRÍTICA ---
      // Nunca salve a senha em texto puro. Sempre gere um "hash".
      const salt = await bcrypt.genSalt(10);
      const senhaHash = await bcrypt.hash(senha, salt);

      const usuario = new Usuario({
        nome,
        email,
        senha: senhaHash, // Salva a senha criptografada
        celular,
        torre,
        apartamento,
        foto,
      });
      await usuario.save();

      // Remove a senha da resposta para não expô-la
      usuario.senha = undefined;

      res.status(201).json(usuario);
    } catch (err) {
      // Adiciona uma verificação para email duplicado
      if (err.code === 11000) {
        return res.status(400).json({ error: "Este e-mail já está em uso." });
      }
      res.status(400).json({ error: err.message });
    }
  },

  // 2. Lógica para LOGIN de usuário
  loginUser: async (req, res) => {
    try {
      const { email, senha } = req.body;

      // Verifica se o usuário existe
      const usuario = await Usuario.findOne({ email });
      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado" }); // Alterado para 404
      }

      // Compara senha digitada com a senha criptografada
      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (!senhaValida) {
        return res.status(400).json({ message: "E-mail ou senha incorreta" });
      }

      // --- MELHORIA DE SEGURANÇA: JWT SECRET ---
      // O segredo do token NUNCA deve estar no código.
      // Vamos usar uma variável de ambiente para isso.
      const token = jwt.sign(
        { id: usuario._id, email: usuario.email },
        process.env.JWT_SECRET, // Usando a variável de ambiente
        { expiresIn: "8h" } // Aumentei o tempo de expiração
      );

      res.json({
        message: "Login realizado com sucesso!",
        token,
        usuario: {
          id: usuario._id,
          nome: usuario.nome,
          email: usuario.email,
          foto: usuario.foto,
        },
      });
    } catch (err) {
      res.status(500).json({ error: "Ocorreu um erro interno no servidor." });
    }
  },

  // 3. Lógica para LISTAR todos os usuários
  getAllUsers: async (req, res) => {
    try {
      const usuarios = await Usuario.find().select("-senha"); // Nunca retornar a senha
      res.json(usuarios);
    } catch (err) {
      res.status(500).json({ error: "Ocorreu um erro interno no servidor." });
    }
  },
};

module.exports = usuarioController;
