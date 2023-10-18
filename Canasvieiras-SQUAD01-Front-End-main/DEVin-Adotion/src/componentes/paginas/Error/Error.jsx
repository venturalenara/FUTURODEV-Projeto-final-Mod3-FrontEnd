import React from "react";
import Rodape from "../../rodape/rodape";
import TelaErro from "../../../imagens/tela-erro.png";
import { useAuthentication } from "../../../hooks/useAuthentication";

const Error = () => {

  const { isLoggedIn } = useAuthentication();


  return (
    <div className="text-center">
      <h1 style={{ fontSize: "45px" }}>Página não encontrada!</h1>
      <p>
        Voltar para a{" "}
        
      {isLoggedIn ? (<a href="/dashboard">
          <strong>Página Inicial</strong>
        </a>
      ) : (
        <a href="/login">
          <strong>Página de Login</strong>
        </a>
      )}

      </p>
      <img src={TelaErro} alt="cachorro" style={{ height: "300px" }} />
      <Rodape />
    </div>
  );
};

export default Error;
