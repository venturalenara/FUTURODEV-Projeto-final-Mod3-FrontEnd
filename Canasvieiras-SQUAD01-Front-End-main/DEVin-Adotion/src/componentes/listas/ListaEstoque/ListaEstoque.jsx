import { useState, useEffect } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { BsSdCard, BsTrash, BsPencil } from "react-icons/bs";

export default function ListaEstoque() {
  const {
    itens: produtos,
    deleteData,
    updateData,
  } = useFetch("http://localhost:8080/estoque");

  const [editingItemId, setEditingItemId] = useState(null);
  const [produtosList, setProdutosList] = useState([]);

  useEffect(() => {
    setProdutosList(produtos);
  }, [produtos]);

  function handleDelete(id) {
    setProdutosList((prevProdutos) =>
      prevProdutos.filter((item) => item.id !== id)
    );
    deleteData(id);
  }

  function handleEdit(id) {
    setEditingItemId(id);
  }

  function handleSave(id) {
    const produtoElement = document.getElementById(`produto-${id}`);
    const quantidadeElement = document.getElementById(`quantidade-${id}`);
    const produto = produtosList.find((item) => item.id === id);

    const updatedProduto = {
      ...produto,
      produto: produtoElement.value,
      quantidade: quantidadeElement.value,
    };

    updateData(id, updatedProduto)
      .then(() => {
        setEditingItemId(null);
        setProdutosList((prevProdutos) =>
          prevProdutos.map((item) =>
            item.id === id ? { ...item, ...updatedProduto } : item
          )
        );
      })
      .catch((error) => {
        console.error("Erro ao atualizar o item:", error);
      });
  }

  function primeiraLetraMaiscula(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function tipoProduto(string){
    if(string === "racao"){
      return "Ração";
    }else if(string === "antiparasitario"){
      return "Antiparasitário";
    }else if(string === "antipulgas"){
      return "Antipulgas";
    }
  }

  return (
    <div className="container">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Armazém</th>
            <th>Produto</th>
            <th>Categoria</th>
            <th>Quantidade</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {produtosList ? (
            produtosList.map((item) => {
              const { nome } = item.armazem || {};
              const isEditing = item.id === editingItemId;

              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{nome}</td>
                  <td>
                    {isEditing ? (
                      <select
                        id={`produto-${item.id}`}
                        defaultValue={item.produto}
                        className="form-control"
                      >
                        <option value="racao">Ração</option>
                        <option value="antiparasitario">Antiparasitário</option>
                        <option value="antipulgas">Antipulgas</option>
                      </select>
                    ) : (
                      tipoProduto(item.produto)
                    )}
                  </td>
                  <td>{primeiraLetraMaiscula(item.categoria)}</td>
                  <td>
                    {isEditing ? (
                      <input
                        type="number"
                        id={`quantidade-${item.id}`}
                        defaultValue={item.quantidade}
                        min={0}
                        className="form-control"
                      />
                    ) : (
                      item.quantidade
                    )}
                  </td>

                  <td>
                    {isEditing ? (
                      <button
                        type="button"
                        className="btn btn-green"
                        onClick={() => handleSave(item.id)}
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
                          <BsPencil className="text-white bg-success" title="Editar"/>
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleDelete(item.id)}
                        >
                          <BsTrash className="text-white bg-danger" title="Remover"/>
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <p>nenhum produto cadastrado ainda</p>
          )}
        </tbody>
      </table>
    </div>
  );
}
