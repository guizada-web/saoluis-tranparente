import React from "react";

export default function Login() {
  return (
    <div style={{ padding: 20, maxWidth: 480, margin: "40px auto", background: "#fff", borderRadius: 8 }}>
      <h2>Entrar</h2>
      <p>Login temporário (placeholder). Integração com backend pode ser feita via API.</p>
      <form>
        <div style={{ marginBottom: 10 }}>
          <label>Email</label>
          <input type="email" style={{ width: "100%" }} />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Senha</label>
          <input type="password" style={{ width: "100%" }} />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
