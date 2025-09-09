// Página: src/pages/Home.js
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import api from "../api/api";
import "./Home.css";

const Home = () => {
  const [anuncios, setAnuncios] = useState([]);
  const [busca, setBusca] = useState("");
  const [modalSelecionado, setModalSelecionado] = useState(null);

  useEffect(() => {
    const fetchAnuncios = async () => {
      try {
        const res = await api.get("/anuncios");
        setAnuncios(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAnuncios();
  }, []);

  const handleSearch = (termo) => {
    setBusca(termo);
  };

  const anunciosFiltrados = anuncios.filter(
    (a) =>
      a.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      a.usuario?.nome?.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div>
      <Header onSearch={handleSearch} />

      <main className="vitrine">
        {anunciosFiltrados.map((anuncio) => (
          <div
            key={anuncio._id}
            className="card-anuncio"
            onClick={() => setModalSelecionado(anuncio)}
          >
            <img
              src={
                anuncio.imagens && anuncio.imagens.length > 0
                  ? `http://localhost:5000/uploads/${anuncio.imagens[0]}`
                  : "/placeholder.png"
              }
              alt={anuncio.titulo}
            />
            <div className="card-conteudo">
              <h3>{anuncio.titulo}</h3>
              <p className="usuario">
                {anuncio.usuario?.nome || "Usuário não informado"}
              </p>
              <p className="preco">
                {anuncio.preco ? `R$ ${anuncio.preco}` : "Preço não informado"}
              </p>
              <button className="btn-ver-mais">Ver mais</button>
            </div>
          </div>
        ))}
      </main>

      {modalSelecionado && (
        <div className="modal" onClick={() => setModalSelecionado(null)}>
          <div className="modal-conteudo" onClick={(e) => e.stopPropagation()}>
            <h2>{modalSelecionado.titulo}</h2>
            <p>{modalSelecionado.descricao}</p>
            <p>
              Usuário:{" "}
              {modalSelecionado.usuario?.nome || "Usuário não informado"}
            </p>
            {modalSelecionado.imagens &&
              modalSelecionado.imagens.map((img, i) => (
                <img
                  key={i}
                  src={`http://localhost:5000/uploads/${img}`}
                  alt={modalSelecionado.titulo}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
