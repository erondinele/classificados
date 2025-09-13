// backend/controllers/anuncioController.js

const Anuncio = require("../models/Anuncio");

const anuncioController = {
  // 1. Lógica para CRIAR um novo anúncio
  createAnuncio: async (req, res) => {
    try {
      // Pega o nome dos arquivos enviados pelo multer
      const imagens = req.files.map((file) => file.filename);

      // PONTO CRÍTICO: Associamos o anúncio ao usuário logado.
      // O `authMiddleware` que vamos adicionar na rota vai nos dar o `req.user`.
      const idDoUsuarioLogado = req.user.id;

      const anuncio = new Anuncio({
        ...req.body,
        imagens: imagens,
        usuario: idDoUsuarioLogado, // Associando o anúncio ao usuário
      });

      await anuncio.save();
      res.status(201).json(anuncio);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // 2. Lógica para LISTAR todos os anúncios
  getAllAnuncios: async (req, res) => {
    try {
      // O .sort({ createdAt: -1 }) mostra os mais recentes primeiro. É uma boa prática.
      const anuncios = await Anuncio.find()
        .populate("usuario", "nome email foto") // Adicionei a foto do usuário
        .sort({ createdAt: -1 });
      res.json(anuncios);
    } catch (err) {
      res.status(500).json({ error: "Ocorreu um erro interno no servidor." });
    }
  },

  // Futuramente podemos adicionar outras funções aqui:
  // getAnuncioById, updateAnuncio, deleteAnuncio, etc.
};

module.exports = anuncioController;
