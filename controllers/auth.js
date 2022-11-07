const { response } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    // Verificar se o email existe no body
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario / Password não estão corretos.",
      });
    }

    // Verificar se o usuário está ativo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario / Password não estão corretos.",
      });
    }

    // Verificar a senha
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / Password não estão corretos. passwd",
      });
    }

    // Gerar o JWT

    res.json({
      msg: "Login OK!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Fale com o adminstrador do sistema.",
    });
  }
};

module.exports = {
  login,
};
