// Página: src/pages/ListaAnuncios.js
import React from "react";

function ListaAnuncios({ anuncios }) {
  return (
    <div>
      <h2>Anúncios</h2>
      <ul>
        {anuncios.map((a) => (
          <li key={a._id}>
            <strong>{a.titulo}</strong> - {a.descricao}
            {a.usuario && <span> (por {a.usuario.nome})</span>}
            <div>
              {a.arquivos &&
                a.arquivos.map((file, i) => (
                  <div key={i}>
                    {file.match(/\.(mp4|mov)$/i) ? (
                      <video
                        width="200"
                        controls
                        src={`http://localhost:5000/uploads/${file}`}
                      />
                    ) : (
                      <img
                        width="200"
                        src={`http://localhost:5000/uploads/${file}`}
                        alt={a.titulo}
                      />
                    )}
                  </div>
                ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaAnuncios;
