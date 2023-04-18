const router = require("express").Router();
const Time = require("../models/Time");
const User = require("../models/User");
//create a time

router.post("/", async (req, res) => {
  const newTime = new Time(req.body);
  try {
    const savedTime = await newTime.save();
    res.status(200).json(savedTime);
  } catch (err) {
    res.status(500).json(err);
  }
});


//GET ALL times
router.get("/", async (req, res) => {
  try {
    let times;
    times = await Time.find();
    res.status(200).json(times);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE device
router.delete("/:time", async (req, res) => {
  const time = await Time.findOne({time:req.params.time});
  try {
      await time.delete();
      res.status(200).json("time has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
});
  module.exports = router;