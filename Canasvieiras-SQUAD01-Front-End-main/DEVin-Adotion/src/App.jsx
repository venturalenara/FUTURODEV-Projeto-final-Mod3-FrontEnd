// App.js

import "./App.css";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import {
  NavbarPadrao,
  NavbarSystem,
  CadastroProdutoPagina,
  ArmazemPagina,
  Dashboard,
  Error,
  LoginPagina,
  EstoquePagina,
  CadastroUserPagina,
} from "./componentes/paginas";
import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication";

export default function App() {

  const { isLoggedIn } = useAuthentication();
  const [authenticated, setAuthenticated] = useState(isLoggedIn);

  useEffect(() => {
    setAuthenticated(isLoggedIn);
  }, [isLoggedIn]);


  return (
    <Router>
      <div>
        {authenticated ? <NavbarSystem /> : <NavbarPadrao />}

        <div className="container">
          <Routes>
            <Route path="/" element={<LoginPagina />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/produtos-estoque" element={<EstoquePagina />} />
            <Route
              path="/cadastro-produtos"
              element={<CadastroProdutoPagina />}
            />
            <Route path="/cadastro-armazem" element={<ArmazemPagina />} />
            <Route path="/login" element={<LoginPagina />} />
            <Route path="/cadastro-usuario" element={<CadastroUserPagina />} />
            <Route path="/*" element={<Error />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
