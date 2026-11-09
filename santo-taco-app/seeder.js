import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";

import Categoria from "./src/models/Categoria.js";
import Prato from "./src/models/Prato.js";
import Comanda from "./src/models/Comanda.js";

dotenv.config();

const popularBanco = async () => {
  try {
    // 1. Conecta ao banco de dados
    await connectDB();

    // 2. Limpa os dados existentes
    console.log("Limpando banco de dados...");
    await Categoria.deleteMany();
    await Prato.deleteMany();
    await Comanda.deleteMany();

    // 3. Criação das Categorias
    console.log("Inserindo Categorias...");
    const categoriasCriadas = await Categoria.insertMany([
      {
        name: "Tacos de carne",
        description: "Tacos feitos de carne vermelha bem gostoso.",
      },
      {
        name: "Tacos apimentados",
        description: "Tacos com pimenta jalapeño fresca.",
      },
      {
        name: "Tacos veganos",
        description: "Opções 100% livres de origem animal.",
      },
    ]);

    const idCarne = categoriasCriadas[0]._id;
    const idApimentado = categoriasCriadas[1]._id;
    const idVegano = categoriasCriadas[2]._id;

    // 4. Criação dos Pratos
    console.log("Inserindo Pratos...");
    const pratosCriados = await Prato.insertMany([
      {
        name: "Taco com queijo",
        image:
          "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?q=80&w=1494",
        preco: 14.99,
        isOfertaDoDia: true,
        categoriaId: idCarne,
      },
      {
        name: "Super taco tacoso",
        image:
          "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=1470",
        preco: 49.99,
        isOfertaDoDia: true,
        categoriaId: idApimentado,
      },
      {
        name: "Burrito Vegano",
        image:
          "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=1464",
        preco: 22.5,
        isOfertaDoDia: false,
        categoriaId: idVegano,
      },
    ]);

    // 5. Criação das Comandas
    console.log("Inserindo Comandas...");
    await Comanda.insertMany([
      {
        numeroMesa: 4,
        nomeCliente: "Ricardo",
        status: "ABERTA",
        pedidos: [
          {
            pratoId: pratosCriados[0]._id,
            nomePrato: pratosCriados[0].name,
            precoUnidade: pratosCriados[0].preco,
            quantidade: 2,
          },
          {
            pratoId: pratosCriados[1]._id,
            nomePrato: pratosCriados[1].name,
            precoUnidade: pratosCriados[1].preco,
            quantidade: 1,
          },
        ],
      },
      {
        numeroMesa: 7,
        nomeCliente: "Maria",
        status: "ABERTA",
        pedidos: [
          {
            pratoId: pratosCriados[2]._id,
            nomePrato: pratosCriados[2].name,
            precoUnidade: pratosCriados[2].preco,
            quantidade: 3,
          },
        ],
      },
    ]);

    console.log("Dados inseridos com sucesso!");
    process.exit();
  } catch (error) {
    console.error("Erro ao popular o banco:", error);
    process.exit(1);
  }
};

popularBanco();
