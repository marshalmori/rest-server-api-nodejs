const { Router } = require("express");
const { check } = require("express-validator");
const { crearCategoria } = require("../controllers/categorias");
const { existeCategoria } = require("../helpers/db-validators");
const { validarCampos, validarJWT } = require("../middlewares");

const router = Router();

// Obter todas as categorias - publico
router.get("/", (req, res) => {
  res.json("get");
});

// Obter uma categoria por id - publico
router.get("/:id", [check("id").custom(existeCategoria)], (req, res) => {
  res.json("get - id");
});

// Criar uma categoria - privado - qualquer com token válido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "O nome da categoria é obrigatório.").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

// Atualizar - privado - qualquer com token válido
router.put("/:id", (req, res) => {
  res.json("put");
});

// Deletar uma categoria - Tem que ser um Admin
router.delete("/:id", (req, res) => {
  res.json("delete");
});

module.exports = router;
