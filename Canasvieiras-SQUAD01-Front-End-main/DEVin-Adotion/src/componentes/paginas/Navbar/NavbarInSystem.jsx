import React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { useAuthentication } from "../../../hooks/useAuthentication";
import Rodape from "../../rodape/rodape";

export default function NavbarSystem() {
  const { logout } = useAuthentication();

  const handleSubmitSair = (event) => {
    event.preventDefault();
    logout();
    window.location.href = "/login"; // redireciona para a página de login
  };

  const nomeUsuario = JSON.parse(localStorage.getItem("userData")).nome;

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light container-fluid bg-light py-4">
        <Link to="/dashboard" className="navbar-brand">
          Dev in Adotion
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/produtos-estoque" className="nav-link">
                Estoque
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cadastro-armazem" className="nav-link ">
                Armazém
              </Link>
            </li>
          </ul>
        </div>
        <div className="d-lg-flex col-lg-3 justify-content-lg-end">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link
            font-weight-bold"
                href="#"
              >
                Olá, {nomeUsuario ? nomeUsuario : ""}!
              </a>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-danger text-white ml-2 btn-sm"
                href="#"
                onClick={handleSubmitSair}
              >
                Sair
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
