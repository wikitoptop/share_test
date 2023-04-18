const router = require("express").Router();
const Comment = require("../models/comment");
const Post = require("../models/Post");
//create a comment

router.post("/", async (req, res) => {
  const newComment = new Comment(req.body);
  try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE comment
router.delete("/:id", async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      if (comment.username === req.body.username) {
        try {
          await Comment.delete();
          res.status(200).json("comment has been deleted...");
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can delete only your comment!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //GET ALL commentS
router.get("/", async (req, res) => {
    try {
      let comments;
      comments = await Comment.find();
      res.status(200).json(comments);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //get a comment

router.get("/:id", async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      res.status(200).json(comment);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
//get post's all comments

router.get("/thispost/:postId", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.postId });
    const comments = await Comment.find({ postId: post._id });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

  module.exports = router;