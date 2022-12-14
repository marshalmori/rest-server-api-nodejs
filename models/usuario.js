const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, "Nome é obrigatório"],
  },
  correo: {
    type: String,
    required: [true, "Email é obrigatório"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "A senha é obrigatória"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    default: "USER_ROLE",
    emun: ["ADMIN_ROLE", "USER_ROLE"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UsuarioSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
};

module.exports = model("Usuario", UsuarioSchema);
