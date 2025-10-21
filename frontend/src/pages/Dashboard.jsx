import React from "react";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <h2>Dashboard da Prefeitura</h2>
        <p>Aqui serão mostrados os filtros por bairro, prioridade e resumo das demandas.</p>
      </main>
    </div>
  );
}
