import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return;

    const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_HOST, MONGODB_DATABASE } =
      process.env;

    if (!MONGODB_HOST || !MONGODB_DATABASE) {
      throw new Error(
        "⚠️ Variáveis de ambiente faltando! Verifique se o arquivo .env existe e está na pasta correta.",
      );
    }

    const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${MONGODB_DATABASE}?retryWrites=true&w=majority`;

    await mongoose.connect(uri);
    console.log(`✅ Conectado com sucesso ao banco: ${MONGODB_DATABASE}`);
  } catch (error) {
    console.error("❌ Erro ao conectar ao MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
