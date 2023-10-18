import { useState, useEffect } from "react";
import { redirect } from "react-router";

export function useAuthentication() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verifica se o usuário está logado no localStorage ao carregar a página
    const userData = localStorage.getItem("userData");
    if (userData) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = () => {
    // Lógica de autenticação bem-sucedida
    setIsLoggedIn(true);

  };

  const logout = () => {
    // Lógica de logout
    setIsLoggedIn(false);
    localStorage.clear();
  };

  return { isLoggedIn, login, logout };
}