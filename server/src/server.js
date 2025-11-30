require("dotenv").config();

const express = require("express");
const cors = require("cors");
const conectarBanco = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const auth = require("./middlewares/auth");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({ mensagem: "Servidor do supermercado funcionando!" });
});

app.use("/api/auth", authRoutes);
app.use(auth);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

const iniciarServidor = async () => {
  try {
    await conectarBanco();
    const porta = process.env.PORT || 5000;
    app.listen(porta, () => {
      console.log(`Servidor rodando na porta ${porta}`);
      console.log(`http://localhost:${porta}`);
    });
  } catch (erro) {
    console.error("Erro ao iniciar o servidor:", erro);
    process.exit(1);
  }
};

iniciarServidor();
