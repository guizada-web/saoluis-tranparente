import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ background: "#fff", padding: "0.75rem 1rem", borderBottom: "1px solid #e2e8f0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 12, alignItems: "center" }}>
        <Link to="/"><strong>São Luís Transparente</strong></Link>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/login">Entrar</Link>
        </div>
      </div>
    </nav>
  );
}
