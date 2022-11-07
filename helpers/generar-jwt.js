const jwt = require("jsonwebtoken");

const generarJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: "30d",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("O token não pode ser gerado.");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generarJWT,
};
