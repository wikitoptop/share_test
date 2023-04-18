const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
      default: "post.jpg",
    },
    username: {
      type: String,
      required: true,
    },
    likes: {
        type: Array,
        default: [],
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
