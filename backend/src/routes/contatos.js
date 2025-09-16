import express from "express";
import contatoController from "../controllers/ContatoControle.js";

const router = express.Router();

router.post("/", contatoController.criarContato);
router.get("/", contatoController.listarContatos);
router.patch("/:id", contatoController.atualizarContato);
router.delete("/:id", contatoController.deletarContato);

export default router;
