import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import Header from "../components/Header";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/usuarios/login", { email, senha });

      // salva o token no localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("usuario", JSON.stringify(response.data.usuario));

      setMensagem("Login realizado com sucesso!");
      navigate("/"); // redireciona para home
    } catch (error) {
      setMensagem(error.response?.data?.message || "Erro ao fazer login");
    }
  };

  return (
    <div>
      <Header />
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <button type="submit">Entrar</button>
        </form>

        {mensagem && <p className="mensagem">{mensagem}</p>}

        <div className="login-links">
          <Link to="/cadastro-usuario">Não tem cadastro? Clique aqui</Link>
          <br />
          <Link to="/esqueci-senha">Esqueci minha senha</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
