const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const usuariosGet = (req = request, res = response) => {
  const { q, nombre = "No name", apikey, page = 1, limit = 5 } = req.query;

  res.json({
    msg: "GET API - controlador",
    q,
    nombre,
    apikey,
    page,
    limit,
  });
};

const usuariosPost = async (req = request, res = response) => {
  const { nombre, correo, password, rol } = req.body;

  const usuario = new Usuario({ nombre, correo, password, rol });

  // Verificar se email existe
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    return res.status(400).json({
      msg: "Este email já existe.",
    });
  }

  // Criptografia da senha
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // Salvar no Banco de dados
  await usuario.save();

  res.json({
    usuario,
  });
};

const usuariosPut = (req = request, res = response) => {
  //   const id = req.params.id;
  const { id } = req.params;
  res.json({
    msg: "PUT API - controlador",
    id,
  });
};

const usuariosPatch = (req = request, res = response) => {
  res.json({
    msg: "PATCH API - controlador",
  });
};

const usuariosDelete = (req = request, res = response) => {
  res.json({
    msg: "DELETE API - controlador",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
