import React from "react";

export default function Login() {
  return (
    <div style={{ 
      padding: "2rem",
      maxWidth: 480,
      margin: "40px auto",
      background: "var(--card-bg)",
      borderRadius: 8,
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      color: "var(--text)",
      border: "1px solid var(--border)"
    }}>
      <h2 style={{ 
        color: "var(--text)",
        marginBottom: "1.5rem"
      }}>Entrar</h2>
      <p style={{ 
        color: "var(--muted)",
        marginBottom: "2rem"
      }}>Login temporário (placeholder). Integração com backend pode ser feita via API.</p>
      <form>
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{
            display: "block",
            marginBottom: "0.5rem",
            color: "var(--text)"
          }}>Email</label>
          <input 
            type="email" 
            style={{ 
              width: "100%",
              padding: "0.75rem",
              borderRadius: "4px",
              border: "1px solid var(--border)",
              background: "var(--bg)",
              color: "var(--text)"
            }}
          />
        </div>
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{
            display: "block",
            marginBottom: "0.5rem",
            color: "var(--text)"
          }}>Senha</label>
          <input 
            type="password" 
            style={{ 
              width: "100%",
              padding: "0.75rem",
              borderRadius: "4px",
              border: "1px solid var(--border)",
              background: "var(--bg)",
              color: "var(--text)"
            }}
          />
        </div>
        <button 
          type="submit"
          style={{
            width: "100%",
            padding: "0.75rem",
            borderRadius: "4px",
            border: "none",
            background: "var(--accent)",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
