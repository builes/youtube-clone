const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const token = req.header("access-token");

    if (!token) return res.status(403).json({ message: "No token provided" });

    const decoded = jwt.verify(token, "secret-word");
    const user = await User.findOne({
      _id: decoded._id,
    });

    if (!user) {
      throw new Error();
    }

    //Podemos asignar valores con req que luego podremos usar en la funcion que llama a esta funcion
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
