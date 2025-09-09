// Página: src/pages/CriarAnuncio.js
import React, { useState } from "react";
import api from "../api/api";

function CriarAnuncio({ onNovoAnuncio }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [arquivos, setArquivos] = useState([]);
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("titulo", titulo);
      formData.append("descricao", descricao);
      arquivos.forEach((file) => formData.append("arquivos", file));

      const res = await api.criarAnuncio(formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMensagem(`Anúncio "${res.data.titulo}" criado com sucesso!`);
      setTitulo("");
      setDescricao("");
      setArquivos([]);

      if (onNovoAnuncio) onNovoAnuncio(res.data);
    } catch (err) {
      setMensagem("Erro ao criar anúncio: " + err.message);
    }
  };

  return (
    <div>
      <h2>Criar Anúncio</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descrição:</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Imagens/Vídeos:</label>
          <input
            type="file"
            multiple
            onChange={(e) => setArquivos(Array.from(e.target.files))}
          />
        </div>
        <button type="submit">Criar Anúncio</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default CriarAnuncio;
