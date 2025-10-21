import { pool } from "../config/db.js";

export const criarObra = async (titulo, descricao, bairro, latitude, longitude, usuario_id, status = 'planejada', progresso = 0, data_inicio = null, data_fim = null, valor_estimado = null) => {
  const result = await pool.query(
    "INSERT INTO obras (titulo, descricao, bairro, latitude, longitude, usuario_id, status, progresso, data_inicio, data_fim, valor_estimado) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
    [titulo, descricao, bairro, latitude, longitude, usuario_id, status, progresso, data_inicio, data_fim, valor_estimado]
  );
  return result.rows[0];
};

export const listarObras = async () => {
  const result = await pool.query("SELECT * FROM obras ORDER BY id DESC");
  return result.rows;
};

export const atualizarObra = async (id, status, progresso = null, data_inicio = null, data_fim = null, valor_estimado = null) => {
  const fields = [];
  const values = [];
  let paramIndex = 1;

  if (status !== undefined) {
    fields.push(`status = $${paramIndex++}`);
    values.push(status);
  }
  if (progresso !== null) {
    fields.push(`progresso = $${paramIndex++}`);
    values.push(progresso);
  }
  if (data_inicio !== null) {
    fields.push(`data_inicio = $${paramIndex++}`);
    values.push(data_inicio);
  }
  if (data_fim !== null) {
    fields.push(`data_fim = $${paramIndex++}`);
    values.push(data_fim);
  }
  if (valor_estimado !== null) {
    fields.push(`valor_estimado = $${paramIndex++}`);
    values.push(valor_estimado);
  }

  values.push(id);

  const query = `UPDATE obras SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`;
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deletarObra = async (id) => {
  const result = await pool.query("DELETE FROM obras WHERE id = $1 RETURNING *", [id]);
  return result.rows[0];
};
