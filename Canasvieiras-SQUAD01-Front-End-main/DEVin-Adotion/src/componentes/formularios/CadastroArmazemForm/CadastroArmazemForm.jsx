import { useFetch } from "../../../hooks/useFetch";
import { useForm } from "../../../hooks/useForm";

export default function CadastroArmazemForm() {
  const { handleChange, form, resetForm } = useForm({
    nome: "",
    animal: "",
    situacao: true,
  });
  const { itens: armazens, createData } = useFetch(
    "http://localhost:8080/armazem"
  );

  const handleSubmit = () => {
    if (form.nome.trim().length === 0) {
      alert("O nome do armazém não pode ser vazio ou em branco");
      return;
    }

    if (armazens.some((armazem) => armazem.nome === form.nome)) {
      alert("Já existe um armazém cadastrado com esse nome");
      return;
    }

    createData(form)
    
    resetForm();
  };

  return (
    <div style={{ display: "flex", justifyContent: "left" }}>
      <div className="form-container col-12">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="col-md-6 mb-3">
              <label htmlFor="nome" className="form-label">
                Armazém:
              </label>
              <input
                type="text"
                className="form-control"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                minLength={3}
                placeholder="Nome do armazém"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="animal" className="form-label">
                Animal:
              </label>
              <select
                className="form-control"
                name="animal"
                value={form.animal}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Selecione o Estoque
                </option>
                <option value="gato">Gato</option>
                <option value="cachorro">Cachorro</option>
              </select>
            </div>
          </div>

          <div className="text-left">
            <button
              type="button"
              className="btn btn-outline-danger mr-2"
              onClick={resetForm}
            >
              Limpar
            </button>
            <button type="submit" className="btn btn-success">
              Cadastrar
            </button>
          </div>
        </form>
      </div>
      <br />
    </div>
  );
}
