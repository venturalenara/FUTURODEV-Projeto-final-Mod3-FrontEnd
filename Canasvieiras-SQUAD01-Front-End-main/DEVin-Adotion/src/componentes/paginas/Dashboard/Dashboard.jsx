import { ListaDashboard } from "../../listas";

export default function Dashboard() {
  return (
    <>
      <div className="container my-5">
        <div className="row p-2 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
          <header className="container">
            <h1 className="text-center">Dashboard</h1>
            <br />
          </header>

          <ListaDashboard />
        </div>
      </div>
    </>
  );
}
