import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import sequelize from "./src/config/database.js";
import contatoRoutes from "./src/routes/contatos.js";

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend")));

app.use("/api", contatoRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão com MySQL estabelecida com sucesso!");
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  } catch (error) {
    console.error("Erro ao conectar no banco:", error);
  }
})();
