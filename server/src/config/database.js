const mongoose = require("mongoose");

const conectarBanco = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Conectado ao MongoDB com sucesso!");
  } catch (erro) {
    console.error("Erro ao conectar no MongoDB:", erro);
    process.exit(1);
  }
};

module.exports = conectarBanco;
