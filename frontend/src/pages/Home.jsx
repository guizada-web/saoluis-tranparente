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
      <main className="main-content">
        <h1 style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "1.5rem",
          color: "var(--text)",
          textAlign: "center"
        }}>
          Demandas Comunitárias e Mapa de Obras
        </h1>

        <div className="content-grid">
          <div className="demandas-section">
            <div className="form-container">
              <h2 style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                marginBottom: "1rem",
                color: "var(--text)"
              }}>
                Nova Demanda
              </h2>
              <form onSubmit={criarDemanda}>
                <input
                  type="text"
                  placeholder="Título"
                  value={nova.titulo}
                  onChange={(e) => setNova({ ...nova, titulo: e.target.value })}
                  className="input-field"
                  required
                />
                <textarea
                  placeholder="Descrição"
                  value={nova.descricao}
                  onChange={(e) => setNova({ ...nova, descricao: e.target.value })}
                  onInput={(e) => {
                    // auto-resize: reset height, então ajusta ao scrollHeight
                    const ta = e.target;
                    ta.style.height = 'auto';
                    ta.style.height = ta.scrollHeight + 'px';
                  }}
                  className="input-field"
                  required
                />
                <input
                  type="text"
                  placeholder="Bairro"
                  value={nova.bairro}
                  onChange={(e) => setNova({ ...nova, bairro: e.target.value })}
                  className="input-field"
                  required
                />
                <button type="submit" className="btn-primary">
                  Criar Demanda
                </button>
              </form>
            </div>

            <div className="demandas-list">
              <h2 style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                marginBottom: "1rem",
                color: "var(--text)"
              }}>
                Demandas Existentes
              </h2>
              {demandas.length === 0 ? (
                <p style={{ color: "var(--muted)" }}>Nenhuma demanda encontrada.</p>
              ) : (
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {demandas.map((d) => (
                    <li key={d.id} className="demanda-item">
                      <div>
                        <h3 style={{
                          fontSize: "1.125rem",
                          fontWeight: "600",
                          marginBottom: "0.5rem",
                          color: "var(--text)"
                        }}>
                          {d.titulo}
                        </h3>
                        <p style={{
                          marginBottom: "0.5rem",
                          color: "var(--text)"
                        }}>
                          {d.descricao}
                        </p>
                        <span style={{
                          fontSize: "0.875rem",
                          color: "var(--muted)"
                        }}>
                          Bairro: {d.bairro}
                        </span>
                      </div>
                      <button
                        onClick={() => deletarDemanda(d.id)}
                        className="btn-danger"
                      >
                        Excluir
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="map-section">
            <h2 style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              marginBottom: "1rem",
              color: "var(--text)"
            }}>
              Mapa de Obras Públicas
            </h2>
            <section className="map-root" aria-label="Mapa de obras públicas">
              <MapView />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
