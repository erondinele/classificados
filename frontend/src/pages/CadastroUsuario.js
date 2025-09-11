// src/pages/CadastroUsuario.js
import React, { useState } from "react";
import api from "../api/api"; // já configurado
import Header from "../components/Header";
import Modal from "../components/Modal";
import "./CadastroUsuario.css";
import { useNavigate } from "react-router-dom";

function CadastroUsuario() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [torre, setTorre] = useState("");
  const [apartamento, setApartamento] = useState("");
  const [senha, setSenha] = useState("");
  const [foto, setFoto] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("email", email);
    formData.append("celular", celular);
    formData.append("torre", torre);
    formData.append("apartamento", apartamento);
    formData.append("senha", senha);
    if (foto) formData.append("foto", foto);

    try {
      await api.post("/usuarios", formData);
      setShowModal(true); // Exibe modal ao invés de mensagem na página
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Header />
      <main className="cadastro-container">
        <h2>Cadastro de Usuário</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Celular"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
            required
          />
          <select
            value={torre}
            onChange={(e) => setTorre(e.target.value)}
            required
          >
            <option value="">Selecione a Torre</option>
            <option>Andirá</option>
            <option>Araucária</option>
            <option>Caúna</option>
            <option>Cedro</option>
            <option>Figueira</option>
            <option>Jacarandá</option>
            <option>Jatobá</option>
            <option>Jequitibá</option>
            <option>Palmeira</option>
            <option>Pau Brasil</option>
            <option>Peroba</option>
          </select>
          <input
            type="number"
            placeholder="Apartamento"
            value={apartamento}
            onChange={(e) => setApartamento(e.target.value)}
            max="999"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <input type="file" onChange={(e) => setFoto(e.target.files[0])} />
          <button type="submit">Cadastrar</button>
        </form>

        <Modal
          show={showModal}
          onClose={() => {
            setShowModal(false);
            navigate("/login"); //Redireciona para a página de login
          }}
          title="Sucesso"
        >
          Cadastro realizado com sucesso!
        </Modal>
      </main>
    </div>
  );
}

export default CadastroUsuario;
