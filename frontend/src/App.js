// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Classificados from "./pages/Classificados";
import CadastrarClassificado from "./pages/CadastrarClassificado";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/classificados" element={<Classificados />} />
        <Route
          path="/cadastrar-classificado"
          element={<CadastrarClassificado />}
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
