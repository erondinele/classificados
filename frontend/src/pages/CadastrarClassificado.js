// src/pages/CadastrarClassificado.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import Header from "../components/Header";

const CadastrarClassificado = () => {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [arquivos, setArquivos] = useState([]);

  // 🔹 Verificação de login (token)
  /*useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Se não tiver token, redireciona para login
      navigate("/login");
    }
  }, [navigate]);*/

  // 🔹 Função de submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("titulo", titulo);
      formData.append("descricao", descricao);
      formData.append("preco", preco);

      for (let i = 0; i < arquivos.length; i++) {
        formData.append("arquivos", arquivos[i]);
      }

      const token = localStorage.getItem("token");

      await api.post("/anuncios", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // envia token
        },
      });

      alert("Classificado cadastrado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao cadastrar o classificado.");
    }
  };

  return (
    <div>
      <Header />
      <div className="form-container">
        <h2>Cadastrar Classificado</h2>
        <form onSubmit={handleSubmit} className="form-container">
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
            placeholder="Preço"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
          />
          <input
            type="file"
            multiple
            onChange={(e) => setArquivos(e.target.files)}
          />
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default CadastrarClassificado;
