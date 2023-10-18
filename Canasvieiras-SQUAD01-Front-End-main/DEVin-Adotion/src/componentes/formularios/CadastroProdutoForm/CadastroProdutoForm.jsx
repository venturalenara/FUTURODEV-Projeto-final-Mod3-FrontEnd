import React, { useEffect, useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { useForm } from "../../../hooks/useForm";
import Cachorro from "../../../imagens/cachorro.png";

export default function CadastroProdutoForm() {
  const { handleChange, form, resetForm } = useForm({
    produto: "",
    quantidade: 0,
    animal: "",
    categoria: "",
    armazem: "",
  });

  const { createData } = useFetch("http://localhost:8080/estoque");
  const { itens: armazens, error } = useFetch("http://localhost:8080/armazem");
  const [selectedArmazem, setSelectedArmazem] = useState(null);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    armazensAbertos();
  }, []);

  const armazensAbertos = () => {
    if (!error && armazens) {
      const armazensDisponiveis = armazens.filter(
        (item) => item.situacao === true
      );
      return armazensDisponiveis;
    }
    return [];
  };

  const handleArmazemChange = (event) => {
    const selectedArmazem = armazens.find(
      (item) => item.id == event.target.value
    );
    setSelectedArmazem(selectedArmazem);
    handleChange(event);
  };

  const handleAnimalChange = (event) => {
    handleChange(event);
  };

  const handleSubmit = (event) => {
    
    event.preventDefault();
    createData(convertToJSON(selectedArmazem))
      .then((response) => {
        if (response.id !== undefined) {
          alert("Item cadastrado com sucesso!");
          setSubmitError("");
        } 
        // else {
        //   setSubmitError(
        //     "Erro ao cadastrar o item. Por favor, verifique os dados e tente novamente."
        //   );
        // }
      })
      .catch((error) => {
        console.error("Erro ao cadastrar o item:", error);
        setSubmitError(
          "Erro ao cadastrar o item. Por favor, verifique os dados e tente novamente."
        );
      });

    resetForm();
  };

  const convertToJSON = (selectedArmazem) => {
    const { produto, quantidade, animal, categoria } = form;
    return {
      produto,
      quantidade,
      animal,
      categoria,
      armazem: { ...selectedArmazem },
    };
  };

  function primeiraLetraMaiscula(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  return (
    <div style={{ display: "flex" }}>
      <img src={Cachorro} style={{ height: "500px" }} />
      <div className="form-container col-4 ">
        <h1>Cadastro Estoque</h1>
        <form onSubmit={handleSubmit}>
          {submitError && (
            <div style={{ color: "red", marginBottom: "1rem" }}>
              {submitError}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="armazem">Armazenamento:</label>
            <select
              name="armazem"
              value={form.armazem}
              onChange={handleArmazemChange}
              className="form-control"
              required
            >
              <option value="" disabled>
                Selecione o Armazém
              </option>
              {armazensAbertos().map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.nome}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="produto">Produto:</label>
            <select
              name="produto"
              value={form.produto}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="" disabled>
                Selecione o Produto
              </option>
              <option value="racao">Ração</option>
              <option value="antiparasitario">Antiparasitário</option>
              <option value="antipulgas">Antipulgas</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="quantidade">Quantidade:</label>
            <input
              type="number"
              name="quantidade"
              min={1}
              required
              value={form.quantidade}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="animal">Animal:</label>
            <select
              name="animal"
              value={form.animal}
              onChange={handleAnimalChange}
              className="form-control"
              required
            >
              <option value="" disabled>
                Selecione o Animal
              </option>
              {selectedArmazem && (
                <option value={selectedArmazem.animal}>
                  {primeiraLetraMaiscula(selectedArmazem.animal)}
                </option>
              )}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="categoria">Categoria:</label>
            <select
              name="categoria"
              value={form.categoria}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="" disabled>
                Selecione a Categoria
              </option>
              <option value="adulto">Adulto</option>
              <option value="filhote">Filhote</option>
            </select>
          </div>
          <button type="submit" className="btn btn-success w-100">
            Cadastrar
          </button>

          <div className="text-center p-2">
            <span>
              Ir para{" "}
              <a href="/produtos-estoque">
                <strong>estoque</strong>
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
