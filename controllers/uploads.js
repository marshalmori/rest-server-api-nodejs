const cargarArchivo = (req, res = response) => {
  res.json({
    msg: "Carregar Arquivos",
  });
};

module.exports = {
  cargarArchivo,
};
