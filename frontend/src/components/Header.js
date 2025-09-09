// Página: src/components/Header.js
import React from "react";
import Menu from "./Menu";
import Busca from "./Busca";
import "./Header.css";

const Header = ({ onSearch }) => {
  const handleSearch = (termo) => {
    if (onSearch) onSearch(termo);
  };

  const handleLimparBusca = () => {
    if (onSearch) onSearch("");
  };

  return (
    <header className="header">
      <Menu />
      <Busca onSearch={handleSearch} limparBusca={handleLimparBusca} />
    </header>
  );
};

export default Header;
