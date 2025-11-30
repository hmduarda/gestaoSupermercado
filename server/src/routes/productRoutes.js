const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.listarTodos);
router.get("/:id", productController.buscarUm);
router.post("/", productController.criar);
router.put("/:id", productController.atualizar);
router.delete("/:id", productController.deletar);
router.post("/:id/promocao", productController.aplicarPromocao);
router.delete("/:id/promocao", productController.removerPromocao);

module.exports = router;
