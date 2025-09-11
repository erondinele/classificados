// Página: src/pages/Login.js
import React, { useState } from "react";
import Header from "../components/Header";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Login com email: ${email}`);
    // Aqui você pode adicionar integração real com backend
  };

  return (
    <div>
      <Header />

      <main className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
        </form>
        <div className="login-links">
          <a href="/esqueci-senha">Esqueci minha senha</a> <br />
          <br />
          <a href="/cadastrar-usuario">Não tem cadastro? Clique aqui</a>
        </div>
      </main>
    </div>
  );
};

export default Login;
