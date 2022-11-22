const { response, request } = require("express");
const { Categoria } = require("../models");

// obtenerCategorias - paginado - total - populate
const obtenerCategorias = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query)
      .populate("usuario", "nombre")
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.json({ total, categorias });
};

// obtenerCatetoria - populate -
const obtenerCategoria = async (req = request, res = response) => {
  const { id } = req.params;

  const categoria = await Categoria.findById(id).populate("usuario", "nombre");

  res.json(categoria);
};

const crearCategoria = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();

  const categoriaDB = await Categoria.findOne({ nombre });

  if (categoriaDB) {
    return res.status(400).json({
      msg: `A categoria ${categoriaDB.nombre} já existe.`,
    });
  }

  // Generar la data a guardar
  const data = {
    nombre,
    usuario: req.usuario._id,
  };

  const categoria = new Categoria(data);

  // Guardar DB
  await categoria.save();

  res.status(201).json(categoria);
};

// actualizarCategoria
const actualizarCategoria = async (req = request, res = response) => {
  const { id } = req.params;
  const nombre = req.body;

  const categoria = await Categoria.findByIdAndUpdate(id, nombre);

  res.json({
    msg: "Atualizado com sucesso.",
    categoria,
  });
};

// borrarCategoria - estado:false
const borrarCategoria = async (req = request, res = response) => {
  const { id } = req.params;
  const categoria = await Categoria.findByIdAndUpdate(id, { estado: false });

  res.json(categoria);
};

module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
};
