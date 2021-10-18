const { Schema, model } = require("mongoose");

const videoSchema = Schema(
  {
    title: {
      type: String,
      maxlength: 50,
      required: true,
      lowercase: true,
      trim: true,
    },
    artist: {
      type: String,
      maxlength: 50,
      required: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      lowercase: true,
    },
    fileName: {
      type: String,
    },
    filePath: {
      type: String,
    },
    // views: {
    //   type: Number,
    //   default: 0,
    // },
    // duration: {
    //   type: String,
    // },
    size: {
      type: Number,
    },
    tags: {
      type: [String],
      lowercase: true,
      trim: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("Video", videoSchema);
