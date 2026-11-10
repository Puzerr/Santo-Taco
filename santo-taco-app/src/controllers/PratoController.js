import Prato from "../models/Prato.js";
import Categoria from "../models/Categoria.js";

const getPratos = async (req, res) => {
  try {
    const { ofertas } = req.query;

    const filtro = {};

    if (ofertas === "true") {
      filtro.isOfertaDoDia = true;
    }

    const pratos = await Prato.find(filtro).populate("categoriaId", "name");

    return res.status(200).json(pratos);
  } catch (error) {
    console.error("Erro ao buscar pratos: ", error);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

export default getPratos;