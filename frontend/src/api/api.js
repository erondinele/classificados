// src/api/api.js
import axios from "axios";

// 1. Cria a instância do axios como você já tinha feito
const api = axios.create({
  baseURL: "http://localhost:5000",
});

// 2. O Interceptor! Isso vai rodar ANTES de CADA requisição
api.interceptors.request.use(
  (config) => {
    // Pega o token do localStorage (onde vamos guardá-lo após o login)
    const token = localStorage.getItem("authToken");

    // Se o token existir, adiciona ao cabeçalho de autorização
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Retorna a configuração da requisição para que ela possa continuar
    return config;
  },
  (error) => {
    // Em caso de erro, rejeita a promessa
    return Promise.reject(error);
  }
);

// --- Daqui para baixo, podemos manter suas funções ou adicionar mais ---

// Exemplo de uma função de login que podemos usar depois
export const loginUsuario = async (credentials) => {
  const response = await api.post("/usuarios/login", credentials);
  return response.data;
};

// Suas funções existentes
export const getAnuncios = async () => {
  const response = await api.get("/anuncios");
  return response.data;
};

export const criarAnuncio = async (formData) => {
  // O header 'Content-Type': 'multipart/form-data' é adicionado automaticamente
  // pelo axios ao usar FormData, então não precisamos mais especificá-lo aqui.
  // E o interceptor já vai adicionar o token de autenticação!
  const response = await api.post("/anuncios", formData);
  return response.data;
};

// Exporta a instância configurada para uso em componentes, como você já fazia
export default api;
