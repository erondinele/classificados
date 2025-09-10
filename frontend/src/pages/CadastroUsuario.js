// frontend/src/pages/CadastroUsuario.js
import React, { useState } from "react";
import Header from "../components/Header";
import api from "../services/api";
import "./CadastroUsuario.css";

const torres = [
  "Andirá",
  "Araucária",
  "Caúna",
  "Cedro",
  "Figueira",
  "Jacarandá",
  "Jatobá",
  "Jequitibá",
  "Palmera",
  "Pau Brasil",
  "Peroba",
].sort();

const CadastroUsuario = () => {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    celular: "",
    torre: "",
    apartamento: "",
    foto: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setForm({ ...form, [name]: files[0] });
    else setForm({ ...form, [name]: value });
  };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const onlyDigits = (s) => s.replace(/\D/g, "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.nome ||
      !form.email ||
      !form.celular ||
      !form.torre ||
      !form.apartamento
    ) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }
    if (!validateEmail(form.email)) {
      alert("Email inválido");
      return;
    }
    if (onlyDigits(form.celular).length < 10) {
      alert("Celular inválido");
      return;
    }

    const data = new FormData();
    data.append("nome", form.nome);
    data.append("email", form.email);
    data.append("celular", onlyDigits(form.celular));
    data.append("torre", form.torre);
    data.append("apartamento", form.apartamento);
    if (form.foto) data.append("foto", form.foto);

    try {
      await api.post("/usuarios", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Usuário cadastrado com sucesso!");
      setForm({
        nome: "",
        email: "",
        celular: "",
        torre: "",
        apartamento: "",
        foto: null,
      });
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar usuário.");
    }
  };

  return (
    <div>
      <Header onSearch={() => {}} />
      <main className="cadastro-page">
        <div className="cadastro-box">
          <h2>Cadastro de Usuário</h2>
          <form onSubmit={handleSubmit}>
            <label>Nome Completo *</label>
            <input
              name="nome"
              value={form.nome}
              onChange={handleChange}
              required
            />
            <label>Email *</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <label>Celular *</label>
            <input
              name="celular"
              value={form.celular}
              onChange={handleChange}
              placeholder="(11) 99999-9999"
              required
            />
            <label>Torre *</label>
            <select
              name="torre"
              value={form.torre}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              {torres.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <label>Apartamento *</label>
            <input
              name="apartamento"
              type="number"
              max="999"
              value={form.apartamento}
              onChange={handleChange}
              required
            />
            <label>Foto (opcional)</label>
            <input
              name="foto"
              type="file"
              accept="image/*"
              onChange={handleChange}
            />
            <button type="submit">Cadastrar</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CadastroUsuario;
