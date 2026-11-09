import mongoose from "mongoose";

const ItemPedidoSchema = new mongoose.Schema({
  pratoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Prato",
    required: true,
  },
  nomePrato: { type: String, required: true },
  precoUnidade: { type: Number, required: true },
  quantidade: { type: Number, required: true, min: 1 },
});

const ComandaSchema = new mongoose.Schema(
  {
    numeroMesa: { type: Number, required: true },
    nomeCliente: { type: Number, required: true },
    pedidos: [ItemPedidoSchema],
    status: {
      type: String,
      enum: ["ABERTA", "EM_PREPARO", "PAGA"],
      deafault: "ABERTA",
    },
  },
  { timestamps: true },
);

export default mongoose.models.Comanda || mongoose.models("Comanda", ComandaSchema);
