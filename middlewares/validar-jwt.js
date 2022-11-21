const { response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = async (req, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "Não tem um token válido.",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    // Ler usuario correspondente ao uid
    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      return res.status(401).json({
        msg: "Token inválido - usuario não está cadastrado no BD",
      });
    }

    // Verificar se o uid tem estado true
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Token inválido - usuario com estado: false",
      });
    }

    req.usuario = usuario;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token inválido.",
    });
  }

  //   console.log(token);

  // next();
};

module.exports = { validarJWT };
