const router = require("express").Router();
const Book = require("../models/Book");
const User = require("../models/User");
//create a book

router.post("/", async (req, res) => {
  const newbook = new Book(req.body);
  try {
    const savedbook = await newbook.save();
    res.status(200).json(savedbook);
  } catch (err) {
    res.status(500).json(err);
  }
});

  //GET ALL books
router.get("/", async (req, res) => {
    try {
      let books;
      books = await Book.find();
      res.status(200).json(books);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
//get user's all books

router.get("/thisuser/:userId", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });
    const books = await Book.find({ userId: user._id });
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json(err);
  }
});
  module.exports = router;