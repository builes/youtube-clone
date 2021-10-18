const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../public/videos/uploaded"),
  // destination: function (req, file, cb) {
  //   cb(null, path.join(__dirname, "../../public/videos/uploaded"));
  // },
  filename: (req, file, cb) => {
    // console.log(file);
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

var upload = multer({
  storage: storage,
  fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4") {
      return cb(new Error("File must be .mp4"));
    }
    cb(null, true);
  },
}).single("video");

module.exports = upload;
