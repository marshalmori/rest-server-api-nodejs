const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
} = require("../controllers/categorias");

const { existeCategoriaPorId } = require("../helpers/db-validators");
const { validarCampos, validarJWT, esAdminRole } = require("../middlewares");

const router = Router();

// Obter todas as categorias - publico
router.get("/", obtenerCategorias);

// Obter uma categoria por id - publico
router.get(
  "/:id",
  [
    check("id", "Não é um ID válido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  obtenerCategoria
);

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
router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "O nome é obrigatório.").not().isEmpty(),
    check("id", "Não é um ID válido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  actualizarCategoria
);

// Deletar uma categoria - Tem que ser um Admin
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "Não é um ID válido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  borrarCategoria
);

module.exports = router;
