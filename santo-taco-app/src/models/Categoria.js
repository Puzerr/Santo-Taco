import mongoose from "mongoose";

const CategoriaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true },
);

const Categoria = mongoose.model("Categoria", CategoriaSchema);
export default Categoria;