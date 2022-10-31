const { response } = require("express");

const usuariosGet = (req, res) => {
  res.json({
    msg: "GET API - controlador",
  });
};

const usuariosPost = (req, res = response) => {
  res.json({
    msg: "POST API - controlador",
  });
};

const usuariosPut = (req, res = response) => {
  res.json({
    msg: "PUT API - controlador",
  });
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "PATCH API - controlador",
  });
};

const usuariosDelete = (req, res = response) => {
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
