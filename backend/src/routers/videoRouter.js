const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  uploadVideo,
  getVideos,
  getOwnVideos,
  deleteVideos,
  deleteVideo,
  getVideo,
  downloadVideo,
} = require("../controllers/videoController");
const upload = require("../middlewares/uploadMulter");

// router.route("/").get().post(upload, uploadVideo);

router.route("/").get(getVideos).post(upload, uploadVideo);
router.get("/:song", getVideo);
// router.post("/", upload, uploadVideo);
// router.get("/me/upload", getUploadVideo);
// router.get("/me", auth, getOwnVideos);
// router.delete("/me/deletevideos", auth, deleteVideos);
router.delete("/:id", deleteVideo);
// router.get("/download/:id", downloadVideo);

module.exports = router;
