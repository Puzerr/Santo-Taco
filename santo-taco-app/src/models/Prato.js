import mongoose from "mongoose";

const PratoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    preco: { type: Number, required: true },
    isOfertaDoDia: { type: Boolean, default: false },
    categoriaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categoria",
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Prato || mongoose.models("Pratos", PratoSchema);
