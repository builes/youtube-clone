const User = require("../models/User");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = new User({
    email,
    password: await User.encryptPassword(password),
  });

  try {
    await user.save();
    const token = jwt.sign({ _id: user.id.toString() }, "secret-word", {
      expiresIn: 86400,
    });

    res.status(200).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.json({ success: false, error });
  }
};

//como puedo hacer para capturar los errores enviados desde findByCredentials
const login = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = jwt.sign({ _id: user.id.toString() }, "secret-word", {
      expiresIn: 86400,
    });
    res.send({ success: true, user, token });
  } catch (error) {
    res.status(400).send({ error });
  }
};

const logout = (req, res) => {
  console.log("hola");
  try {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "" });
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.send("error");
  }
};

const updateProfile = async (req, res) => {
  const updateFields = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updateFields.every((field) =>
    allowedUpdates.includes(field)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates fields" });
  }

  try {
    updateFields.forEach((field) => (req.user[field] = req.body[field]));
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
};

const profile = (req, res) => {
  res.send(req.user);
};

module.exports = { register, login, logout, updateProfile, profile };
