const { Router } = require("express");
const { check } = require("express-validator");

const {
  crearProducto,
  obtenerProducto,
  obtenerProductos,
  actualizarProducto,
  borrarProducto,
} = require("../controllers/productos");

const {
  existeCategoriaPorId,
  existeProductoPorId,
} = require("../helpers/db-validators");
const { validarCampos, validarJWT, esAdminRole } = require("../middlewares");

const router = Router();

router.get("/", obtenerProductos);

router.get(
  "/:id",
  [
    check("id", "Não é um ID válido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  obtenerProducto
);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "O nome do produto é obrigatório.").not().isEmpty(),
    check("categoria", "Não é um ID válido - Produto").isMongoId(),
    check("categoria").custom(existeCategoriaPorId),
    validarCampos,
  ],
  crearProducto
);

// Atualizar - privado - qualquer com token válido
router.put(
  "/:id",
  [
    validarJWT,
    // check("categoria", "Não é um ID válido - Produto").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  actualizarProducto
);

// Deletar uma categoria - Tem que ser um Admin
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "Não é um ID válido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  borrarProducto
);

module.exports = router;
