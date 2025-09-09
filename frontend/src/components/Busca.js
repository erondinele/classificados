// Página: src/components/Busca.js
import React, { useState } from "react";
import "./Busca.css";
import { FaSearch } from "react-icons/fa";

const Busca = ({ onSearch, limparBusca }) => {
  const [termo, setTermo] = useState("");

  const handleChange = (e) => {
    setTermo(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  const handleLimpar = () => {
    setTermo("");
    if (limparBusca) limparBusca();
  };

  return (
    <div className="busca-container">
      <div className="input-wrapper">
        <FaSearch className="icon-lupa" />
        <input
          type="text"
          placeholder="Buscar classificados..."
          value={termo}
          onChange={handleChange}
        />
        <button onClick={() => onSearch && onSearch(termo)}>Buscar</button>
      </div>
      {termo && (
        <button className="btn-limpar-busca" onClick={handleLimpar}>
          Limpar Busca
        </button>
      )}
    </div>
  );
};

export default Busca;
