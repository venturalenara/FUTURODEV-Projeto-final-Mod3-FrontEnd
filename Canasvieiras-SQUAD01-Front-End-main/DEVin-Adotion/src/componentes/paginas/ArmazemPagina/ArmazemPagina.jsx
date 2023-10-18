import { useState, useEffect } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { CadastroArmazemForm } from "../../formularios";
import { BsSdCard, BsTrash, BsPencil } from "react-icons/bs";
import { BiSolidCat, BiSolidDog } from "react-icons/bi";

export default function ArmazemPagina() {
  const { itens: armazens, updateData } = useFetch(
    "http://localhost:8080/armazem"
  );
  const { itens: produtos } = useFetch("http://localhost:8080/estoque");
  const [produtosList, setProdutosList] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [armazensList, setArmazensList] = useState([]);

  useEffect(() => {
    setArmazensList(armazens);
    setProdutosList(produtos);
  }, [armazens, produtos]);

  function handleEdit(id) {
    setEditingItemId(id);
  }

  function handleSave(id) {
    const nomeElement = document.getElementById(`nome-${id}`);
    const animalElement = document.getElementById(`animal-${id}`);
    const armazem = armazensList.find((item) => item.id === id);
    const updatedArmazem = {
      ...armazem,
      nome: nomeElement.value,
      animal: animalElement.value,
    };

    // Verifica se o nome do armazém está vazio ou em branco
    if (nomeElement.value.trim().length === 0) {
      alert("O nome do armazém não pode ser vazio ou em branco");
      return;
    }

    // Verifica se já existe um armazém com o mesmo nome
    if (armazensList.some((item) => item.nome === nomeElement.value && item.id !== id)) {
      alert("Já existe um armazém cadastrado com esse nome");
      return;
    }

    updateData(id, updatedArmazem)
      .then(() => {
        setEditingItemId(null);
        setArmazensList((prevArmazens) =>
          prevArmazens.map((item) =>
            item.id === id ? { ...item, ...updatedArmazem } : item
          )
        );
      })
      .catch((error) => {
        console.error("Erro ao atualizar o item:", error);
      });
  }

  function handleToggleStatus(id) {
    const armazem = armazensList.find((item) => item.id === id);
    const hasProducts = produtosList.some(
      (item) => item.armazem && item.armazem.id === id
    );

    if (hasProducts) {
      alert(
        "Não é possível desativar o armazém. Existem produtos vinculados a ele."
      );
      return;
    }

    setArmazensList((prevArmazens) =>
      prevArmazens.map((item) =>
        item.id === id ? { ...item, situacao: !item.situacao } : item
      )
    );

    const updatedArmazem = {
      ...armazem,
      situacao: !armazem.situacao,
    };

    updateData(`desativar/${id}`, updatedArmazem).catch((error) => {
      console.error("Erro ao atualizar o item:", error);
    });
  }

  return (
    <div className="container my-5">
      <div className="row p-2 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
        <header className="container">
          <h1>Cadastro Armazém</h1>
          <br />
        </header>

        <CadastroArmazemForm />

        <h2 className="col-12 py-3">Lista de Armazéns</h2>

        <div className="container">
          <table className="table table-striped table-hover">

            <thead>
              <tr>
                <th>ID</th>
                <th>Nome do Armazém</th>
                <th>Animal</th>
                <th>Situação</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {armazensList ? (
                armazensList.map((item) => {
                  const isEditing = item.id === editingItemId;

                  return (
                    <tr key={item.id}>
                      <th>{item.id}</th>
                      {isEditing ? (
                        <td>
                          <input
                            id={`nome-${item.id}`}
                            defaultValue={item.nome}
                            type="text"
                            className="form-control"
                          />
                        </td>
                      ) : (
                        <td>{item.nome}</td>
                      )}
                      {isEditing ? (
                        <td>
                          <select
                            id={`animal-${item.id}`}
                            defaultValue={item.animal}
                            className="form-control"
                          >
                            <option value="gato">
                              Gato
                            </option>
                            <option value="cachorro">
                              Cachorro
                            </option>
                          </select>
                        </td>
                      ) : (
                        <td>
                          {item.animal === "gato" ? (
                            <BiSolidCat size={30} />
                          ) : (
                            <BiSolidDog size={30} />
                          )}
                        </td>
                      )}
                      <td>{item.situacao ? "Disponivel" : "Indisponivel"}</td>
                      <td>
                        {isEditing ? (
                          <button
                            type="button"
                            onClick={() => handleSave(item.id)}
                            className="btn btn-green"
                          >
                            <BsSdCard className="text-white btn-green" title="Salvar" />
                          </button>
                        ) : (
                          <>
                            <button
                              type="button"
                              className="btn btn-success"
                              onClick={() => handleEdit(item.id)}
                            >
                              <BsPencil className="text-white bg-success" title="Editar" />
                            </button>
                            {item.situacao === true ? (
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => handleToggleStatus(item.id)}
                              >
                                <BsTrash className="text-white bg-danger" title="Desativar" />
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="btn btn-danger"
                                //leganda
                                title="Não é possível excluir um armazém indisponível"
                                disabled
                              >
                                <BsTrash className="text-white bg-danger" />
                              </button>
                            )}
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5}>Nenhum armazém cadastrado ainda</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
