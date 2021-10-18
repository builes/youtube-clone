const router = require("express").Router();
const auth = require("../middlewares/auth");
const { uplike } = require("../controllers/likeController");

router.post("/uplike", uplike);

module.exports = router;
