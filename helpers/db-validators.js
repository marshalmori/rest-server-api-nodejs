const Role = require("../models/role");
const Usuario = require("../models/usuario");

const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`A função ${rol} não existe no banco de dados.`);
  }
};

const emailExiste = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`O email ${correo} já está cadastrado.`);
  }
};

module.exports = {
  esRoleValido,
  emailExiste,
};
