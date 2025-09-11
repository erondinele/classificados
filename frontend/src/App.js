// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CadastroUsuario from "./pages/CadastroUsuario";
import Login from "./pages/Login";
import Classificados from "./pages/Classificados";
import CadastrarClassificado from "./pages/CadastrarClassificado";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/classificados" element={<Classificados />} />
        <Route
          path="/cadastrar-classificado"
          element={<CadastrarClassificado />}
        />
        <Route path="/cadastrar-usuario" element={<CadastroUsuario />} />
      </Routes>
    </Router>
  );
}

export default App;
