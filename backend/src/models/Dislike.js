const { Schema, model } = require("mongoose");

const dislikeSchema = Schema(
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

const Dislike = model("Dislike", dislikeSchema);

module.exports = Dislike;
