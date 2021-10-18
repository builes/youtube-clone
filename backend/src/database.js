const mongoose = require("mongoose");

const url = "mongodb://127.0.0.1:27017/youtube-clone";

mongoose
  .connect(url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("database connected");
  })
  .catch((error) => {
    console.log(error);
  });
