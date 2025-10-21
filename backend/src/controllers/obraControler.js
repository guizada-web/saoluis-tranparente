import { criarObra, listarObras, atualizarObra, deletarObra } from "../models/obraModel.js";

export const getObras = async (req, res) => {
  try {
    const obras = await listarObras();
    res.json(obras);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar obras", error });
  }
};

export const postObra = async (req, res) => {
  try {
    const { titulo, descricao, bairro, latitude, longitude, usuario_id, status, progresso, data_inicio, data_fim, valor_estimado } = req.body;
    const nova = await criarObra(titulo, descricao, bairro, latitude, longitude, usuario_id, status, progresso, data_inicio, data_fim, valor_estimado);
    res.status(201).json(nova);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar obra", error });
  }
};

export const putObra = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, progresso, data_inicio, data_fim, valor_estimado } = req.body;
    const atualizada = await atualizarObra(id, status, progresso, data_inicio, data_fim, valor_estimado);
    res.json(atualizada);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar obra", error });
  }
};

export const deleteObra = async (req, res) => {
  try {
    const { id } = req.params;
    const deletada = await deletarObra(id);
    res.json(deletada);
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar obra", error });
  }
};
