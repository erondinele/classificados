// Página: src/pages/DetalheAnuncio.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import "./DetalheAnuncio.css";

function DetalheAnuncio() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [anuncio, setAnuncio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAnuncios().then((res) => {
      const encontrado = res.data.find((a) => a._id === id);
      setAnuncio(encontrado);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!anuncio) return <p>Anúncio não encontrado.</p>;

  return (
    <div className="detalhe-container">
      <button className="voltar" onClick={() => navigate(-1)}>
        ← Voltar
      </button>
      <h2>{anuncio.titulo}</h2>
      {anuncio.usuario && (
        <p>
          <strong>Anunciante:</strong> {anuncio.usuario.nome}
        </p>
      )}
      {anuncio.descricao && <p>{anuncio.descricao}</p>}
      {anuncio.preco && (
        <p>
          <strong>Preço:</strong> R$ {anuncio.preco}
        </p>
      )}
      <div className="galeria">
        {anuncio.arquivos &&
          anuncio.arquivos.map((file, i) => (
            <div key={i} className="media">
              {file.match(/\.(mp4|mov)$/i) ? (
                <video controls src={`http://localhost:5000/uploads/${file}`} />
              ) : (
                <img
                  src={`http://localhost:5000/uploads/${file}`}
                  alt={anuncio.titulo}
                />
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default DetalheAnuncio;
