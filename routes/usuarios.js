const { Router } = require("express");
const { check } = require("express-validator");

const { esRoleValido, emailExiste } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");

const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", usuariosGet);

router.put("/:id", usuariosPut);

router.post(
  "/",
  [
    check("nombre", "O nome é obrigatório.").not().isEmpty(),
    check("password", "A senha deve ter 6 ou mais caracteres.").isLength({
      min: 6,
    }),
    check("correo", "Email inválido.").isEmail(),
    check("correo").custom(emailExiste),
    // check("rol", "Não é uma função válida.").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPost
);

router.delete("/", usuariosDelete);

router.patch("/", usuariosPatch);

module.exports = router;
