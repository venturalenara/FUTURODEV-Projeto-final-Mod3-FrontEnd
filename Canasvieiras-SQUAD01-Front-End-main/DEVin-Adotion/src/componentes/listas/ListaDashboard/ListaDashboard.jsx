import { useFetch } from "../../../hooks/useFetch";
import { BiSolidCat, BiSolidDog } from "react-icons/bi";

export default function ListaDashboard() {
  const animalCategoria = (animal, categoria) => {
    const { itens: itensDash, error } = useFetch(
      `http://127.0.0.1:8080/estatisticas/${animal}/${categoria}`
    );
    if (error) {
      return <div>Erro ao carregar os dados do dashboard</div>;
    } else {
      return (
        <div className="col-12">
          <h5 className="card-title ml-5">{primeiraLetraMaiscula(categoria)}</h5>
          <div className="card border-0">
            <div className="card-body">
              <div className="card-text d-flex flex-row text-center">
                <div
                  className="card flex-fill border-0 mr-5"
                  style={{ minWidth: "150px", maxHeight: "150px" }}
                >
                  <div className="card-body">
                    {animal === "cachorro" ? (
                      <BiSolidDog size={80} />
                    ) : (
                      <BiSolidCat size={80} />
                    )}
                  </div>
                </div>
                <div
                  className="card flex-fill mr-5"
                  style={{ minWidth: "150px", maxHeight: "150px" }}
                >
                  <div className="card-body brilho-dashboard">
                    <p className="card-text">Kg de Ração</p>
                    <h5 className="text-text font-weight-bold">
                      {itensDash.totalRacao}
                    </h5>
                  </div>
                </div>
                <div className="card flex-fill mr-5" style={{ minWidth: "150px" }}>
                  <div className="card-body brilho-dashboard">
                    <p className="card-text">Antipulgas</p>
                    <h5 className="text-text font-weight-bold">
                      {itensDash.totalComAntipulgas}
                    </h5>
                  </div>
                </div>
                <div className="card flex-fill mr-5" style={{ minWidth: "150px" }}>
                  <div className="card-body brilho-dashboard">
                    <p className="card-text">Antiparasitário</p>
                    <h5 className="text-text font-weight-bold">
                      {itensDash.totalComAntiparasitario}
                    </h5>
                  </div>
                </div>
                <div className="card flex-fill mr-2" style={{ minWidth: "150px" }}>
                  <div className="card-body brilho-dashboard">
                    <p className="card-text">{primeiraLetraMaiscula(animal)}</p>
                    <h5 className="text-text font-weight-bold">
                      {itensDash.total}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  function primeiraLetraMaiscula(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="container">
      <div className="row">
        {animalCategoria("cachorro", "filhote")}
        {animalCategoria("cachorro", "adulto")}
        {animalCategoria("gato", "filhote")}
        {animalCategoria("gato", "adulto")}
      </div>
    </div>
  );
}
