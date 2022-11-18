const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

// Obter todas as categorias - publico
router.get("/", (req, res) => {
  res.json("get");
});

// Obter uma categoria por id - publico
router.get("/:id", (req, res) => {
  res.json("get - id");
});

// Criar uma categoria - privado - qualquer com token válido
router.post("/", (req, res) => {
  res.json("post");
});

// Atualizar - privado - qualquer com token válido
router.put("/:id", (req, res) => {
  res.json("put");
});

// Deletar uma categoria - Tem que ser um Admin
router.delete("/:id", (req, res) => {
  res.json("delete");
});

module.exports = router;
