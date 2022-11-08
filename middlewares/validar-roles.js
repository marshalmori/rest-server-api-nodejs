const { response } = require("express");
const role = require("../models/role");

const esAdminRole = (req, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: "Está verificando o role sem validar o token primeiro.",
    });
  }

  const { role, nombre } = req.usuario;

  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${nombre} não é um administrador.`,
    });
  }

  next();
};

const tieneRole = (...roles) => {
  return (req, res = response, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        msg: "Foi verificado o role sem validar o token primeiro.",
      });
    }

    if (!roles.includes(req.usuario.rol)) {
      return res.status(401).json({
        msg: `Esta funcionalidade requer um desses roles: ${roles}`,
      });
    }

    next();
  };
};

module.exports = { esAdminRole, tieneRole };
