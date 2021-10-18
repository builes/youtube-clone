const { set } = require("mongoose");
const Video = require("../models/Video");
const path = require("path");

const uploadVideo = async (req, res) => {
  const { title, artist, description } = req.body;
  const fileName = req.file.filename;
  const filePath = "/videos/uploaded/" + req.file.filename;
  const size = (req.file.size / 1048576).toFixed(3);
  let messyTags = req.body.tags.split(",");
  const tags = messyTags.map((tag) => {
    return tag.trim().toLowerCase();
  });
  // console.log(req.user);
  const video = new Video({
    title,
    artist,
    description,
    fileName,
    filePath,
    size,
    tags,
    // owner: req.user.id,
  });
  // console.log(video);
  try {
    await video.save();
    // res.redirect("/");
    res.send("video uploaded");
  } catch (error) {
    res.status(400).send(error);
  }
};

const getVideos = async (req, res) => {
  const videos = await Video.find();
  res.send(videos);
};

const getVideo = async (req, res) => {
  const search = req.params.song.toLowerCase().trim();
  const videos = await Video.find();
  let foundVideos = videos.filter((video) => {
    return (
      video.title.toLowerCase().indexOf(search) != -1 ||
      video.tags.indexOf(search) != -1 ||
      video.artist.indexOf(search) != -1
    );
  });
  // console.log(foundVideos);
  res.send(foundVideos);
};

const getOwnVideos = async (req, res) => {
  const videos = await Video.find({ owner: req.user._id }).populate("owner");
  res.send(videos);
};

const deleteVideos = async (req, res) => {
  const deletedVideos = await Video.deleteMany({ owner: req.user._id });
  res.status(200).json({
    success: true,
  });
};

const deleteVideo = async (req, res) => {
  console.log("delete video");
  await Video.findByIdAndDelete(req.params.id);
  res.send("deleted video");
};

const downloadVideo = async (req, res) => {
  const video = await Video.findById(req.params.id);
  file = video.filePath;
  console.log(video.filePath);
  console.log(path.join(__dirname, `../../public/${video.filePath}`));
  file = path.join(__dirname, `../../public/${video.filePath}`);
  res.download(file);
};

module.exports = {
  uploadVideo,
  getVideos,
  getOwnVideos,
  deleteVideos,
  deleteVideo,
  getVideo,
  downloadVideo,
};
