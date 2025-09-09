// Página: src/pages/CadastrarClassificado.js
import React, { useState } from "react";
import Header from "../components/Header";
import api from "../api/api";
import "./CadastrarClassificado.css";

const CadastrarClassificado = () => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [imagens, setImagens] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descricao", descricao);
    formData.append("preco", preco);
    for (let i = 0; i < imagens.length; i++) {
      formData.append("arquivos", imagens[i]);
    }

    try {
      await api.post("/anuncios", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Classificado cadastrado com sucesso!");
      setTitulo("");
      setDescricao("");
      setPreco("");
      setImagens([]);
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar classificado.");
    }
  };

  return (
    <div>
      <Header />

      <main className="cadastrar-container">
        <h2>Cadastrar Classificado</h2>
        <form onSubmit={handleSubmit} className="cadastrar-form">
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
          <textarea
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Preço (opcional)"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
          />
          <input
            type="file"
            multiple
            onChange={(e) => setImagens(e.target.files)}
          />
          <button type="submit">Cadastrar</button>
        </form>
      </main>
    </div>
  );
};

export default CadastrarClassificado;
