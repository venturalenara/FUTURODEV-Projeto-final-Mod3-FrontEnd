import { ListaEstoque } from "../../listas";

export default function EstoquePagina() {
  return (
    <div className="container my-5">
      <div className="row p-2 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
        <header className="container">
          <h1>Lista de Produtos</h1>
        </header>

        <ListaEstoque />

        <div className="container text-center p-2">
          <a className="btn btn-success" href="/cadastro-produtos">
            Cadastrar Produto
          </a>
        </div>
      </div>
      <br />
    </div>
  );
}
