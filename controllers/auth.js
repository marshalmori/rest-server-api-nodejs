const { response, json } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

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

    // Gerar o JWT - helpers > generar-jwt.js
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Fale com o adminstrador do sistema.",
    });
  }
};

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    // const googleUser = await googleVerify(id_token);
    // console.log(googleUser);

    const { nombre, img, correo } = await googleVerify(id_token);

    let usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      // Se não tem usuário, temos que criá-lo
      const data = {
        nombre,
        correo,
        password: ":P",
        img,
        google: true,
      };
      usuario = new Usuario(data);
      await usuario.save();
    }

    // Se estado é igual a false
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Fale com o administrador, usuario bloqueado.",
      });
    }

    // Gerar o JWT - helpers > generar-jwt.js
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "O token não pode ser verificado.",
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
