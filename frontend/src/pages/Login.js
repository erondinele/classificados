// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../services/authService"; // 1. Importamos nosso novo serviço
import Header from "../components/Header";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // 2. Usando o mesmo padrão de estado do Cadastro
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 3. Toda a lógica de API e localStorage agora está no serviço!
      await authService.login(email, senha);

      // Se o login for bem-sucedido, o serviço já salvou o token.
      // Agora só precisamos redirecionar o usuário.
      navigate("/"); // Redireciona para home
    } catch (err) {
      // 4. O serviço joga o erro, e nós o capturamos aqui para exibir na tela
      setError(err.response?.data?.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
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

          {/* 5. Exibimos o erro e desabilitamos o botão durante o loading */}
          {error && <p className="error-message">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

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
