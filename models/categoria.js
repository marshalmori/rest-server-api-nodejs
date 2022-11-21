const { Schema, model } = require("mongoose");

const Categoria = Schema({
  nombre: {
    type: String,
    required: [true, "O nome da categoria é obrigatório."],
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

module.exports = model("Categoria", Categoria);
