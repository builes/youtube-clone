const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      minglength: 3,
      maxlength: 50,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minglength: 6,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error("Age must be a positive number");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      // minLength: 7,
    },
    // token: {
    //   type: String,
    // }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.statics.encryptPassword = async (password) => {
  return await bcrypt.hash(password, 8);
};

userSchema.statics.comparePassword = async (password, recivedPassword) => {
  return await bcrypt.compare(password, recivedPassword);
};

//Metodo para comprobar que un usuario si ingresa correcatamente su usario y password
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login");
  }

  //Aca validamos si la password ingresada por el usuario concuerda con la que tenemos como hash
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

// userSchema.methods.generateAuthToken = async function () {
//   // Asi creamos el token para un usuario
//   const token = jwt.sign({ _id: this.id.toString() }, "secret-word", {
//     expiresIn: 86400,
//   });
//   this.token = token;
//   return token;
// };

const User = model("User", userSchema);

module.exports = User;
