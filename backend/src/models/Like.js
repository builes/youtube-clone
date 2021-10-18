const { Schema, model } = require("mongoose");

const likeSchema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    videoId: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
  },
  { timestamps: true, versionKey: false }
);

const Like = model("Like", likeSchema);

module.exports = Like;
