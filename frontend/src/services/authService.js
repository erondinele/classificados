// src/services/authService.js
import { loginUsuario } from "../api/api"; // Importa a função de login da nossa API

const authService = {
  login: async (email, senha) => {
    try {
      // Chama a função da API
      const data = await loginUsuario({ email, senha });

      // Se o login for bem-sucedido e tiver um token
      if (data.token) {
        // Salva o token no localStorage
        localStorage.setItem("authToken", data.token);
        // Opcional: Salva os dados do usuário também
        localStorage.setItem("authUser", JSON.stringify(data.usuario));
      }
      return data;
    } catch (error) {
      // Se houver um erro, o componente que chamou irá tratar
      console.error("Erro no serviço de login:", error);
      throw error;
    }
  },

  logout: () => {
    // Simplesmente remove os dados do localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
  },

  // Uma função para verificar se o usuário está logado
  isLoggedIn: () => {
    return !!localStorage.getItem("authToken");
  },

  // Uma função para pegar os dados do usuário logado
  getCurrentUser: () => {
    const user = localStorage.getItem("authUser");
    return user ? JSON.parse(user) : null;
  },
};

export default authService;
