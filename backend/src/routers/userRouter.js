const router = require("express").Router();
const {
  register,
  login,
  logout,
  profile,
  updateProfile,
} = require("../controllers/userController");
const auth = require("../middlewares/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", auth, logout);
router.get("/profile", auth, updateProfile);
router.patch("/updateprofile", auth, updateProfile);

module.exports = router;
