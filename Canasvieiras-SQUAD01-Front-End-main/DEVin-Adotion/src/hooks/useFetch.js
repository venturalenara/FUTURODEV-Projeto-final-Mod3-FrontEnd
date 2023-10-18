import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [itens, setItens] = useState([]);

  const getData = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setItens(data);
      });
  };
  
  const createData = (body) => {
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.error("Erro ao cadastrar o item:", error);
      throw error;
    });
  };

  const deleteData = (id) => {
    fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
    .then(() => getData());
  };

  const updateData = (id, body) => {
    return new Promise((resolve, reject) => {
      fetch(`${url}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  };

  useEffect(() => getData(), []);
  
  return { itens, createData, deleteData, updateData, getData};
}