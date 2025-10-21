import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import MapView from "../components/MapView";

export default function Home() {
  const [demandas, setDemandas] = useState([]);
  const [nova, setNova] = useState({ titulo: "", descricao: "", bairro: "" });

  const carregarDemandas = async () => {
    const res = await api.get("/demandas");
    setDemandas(res.data);
  };

  const criarDemanda = async (e) => {
    e.preventDefault();
    await api.post("/demandas", { ...nova });
    setNova({ titulo: "", descricao: "", bairro: "" });
    carregarDemandas();
  };

  const deletarDemanda = async (id) => {
    await api.delete(`/demandas/${id}`);
    carregarDemandas();
  };

  useEffect(() => {
    carregarDemandas();
  }, []);

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content p-6">
        <h1 className="text-2xl font-bold mb-4">Demandas Comunitárias</h1>

        <form onSubmit={criarDemanda} className="mb-6 space-y-2">
          <input
            type="text"
            placeholder="Título"
            value={nova.titulo}
            onChange={(e) => setNova({ ...nova, titulo: e.target.value })}
            className="border p-2 w-full rounded"
          />
          <textarea
            placeholder="Descrição"
            value={nova.descricao}
            onChange={(e) => setNova({ ...nova, descricao: e.target.value })}
            className="border p-2 w-full rounded"
          />
          <input
            type="text"
            placeholder="Bairro"
            value={nova.bairro}
            onChange={(e) => setNova({ ...nova, bairro: e.target.value })}
            className="border p-2 w-full rounded"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Criar
          </button>
        </form>

        <ul>
          {demandas.map((d) => (
            <li
              key={d.id}
              className="border p-3 rounded mb-2 flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold">{d.titulo}</h2>
                <p>{d.descricao}</p>
                <span className="text-sm text-gray-500">{d.bairro}</span>
              </div>
              <button
                onClick={() => deletarDemanda(d.id)}
                className="text-red-500 hover:underline"
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>

        <section className="map-root" aria-label="Mapa de obras">
          <MapView />
        </section>
      </main>
    </div>
  );
}
