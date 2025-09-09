// Página: src/components/Menu.js
import React, { useState } from "react";
import "./Menu.css";
import { FaHome, FaList, FaPlus, FaSignInAlt } from "react-icons/fa";

const Menu = () => {
  const [ativo, setAtivo] = useState(false);

  const toggleMenu = () => setAtivo(!ativo);

  return (
    <nav className="menu-container">
      <div className="menu-titulo">Classificados Mairarê</div>

      <div
        className={`hamburger ${ativo ? "active" : ""}`}
        onClick={toggleMenu}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className={`menu-items ${ativo ? "active" : ""}`}>
        <a href="/">
          <FaHome /> Home
        </a>
        <a href="/classificados">
          <FaList /> Classificados
        </a>
        <a href="/cadastrar-classificado">
          <FaPlus /> Cadastrar Classificado
        </a>
        <a href="/login">
          <FaSignInAlt /> Login
        </a>
      </div>
    </nav>
  );
};

export default Menu;
