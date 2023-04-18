const router = require("express").Router();
const Record = require("../models/Record");

//CREATE Record
router.post("/", async (req, res) => {
  const newRecord = new Record(req.body);
  try {
    const savedRecord = await newRecord.save();
    res.status(200).json(savedRecord);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET ALL RecordS
router.get("/", async (req, res) => {
    try {
      let records;
      records = await Record.find();
      res.status(200).json(records);
    } catch (err) {
      res.status(500).json(err);
    }
  });
//DELETE device
router.delete("/:record", async (req, res) => {
  const device = await Record.findOne({drecord:req.params.device});
  try {
      await device.delete();
      res.status(200).json("device has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
});
module.exports = router;