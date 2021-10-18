const Like = require("../models/Like");
const Dislike = require("../models/Dislike");

const uplike = async (req, res) => {
  try {
    const like = new Like({
      ...req.body,
    });
    await like.save();
    res.status(201).json({ success: true });
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  uplike,
};
