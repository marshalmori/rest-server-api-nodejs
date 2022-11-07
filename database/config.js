const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //useCreateIndex: true,
      //useFindAndModify: false,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao iniciar o banco de dados.");
  }
};

console.log("Banco de dados online.");

module.exports = {
  dbConnection,
};
