// Página: src/api/api.js
import axios from "axios";

// Cria instância do axios apontando para o backend
const api = axios.create({
  baseURL: "http://localhost:5000", // URL do seu backend
});

// Função para buscar todos os anúncios
export const getAnuncios = async () => {
  try {
    const response = await api.get("/anuncios");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar anúncios:", error);
    throw error;
  }
};

// Função para criar um novo anúncio com imagens
export const criarAnuncio = async (formData) => {
  try {
    const response = await api.post("/anuncios", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar anúncio:", error);
    throw error;
  }
};

// Exporta o axios puro caso precise de outras requisições
export default api;
