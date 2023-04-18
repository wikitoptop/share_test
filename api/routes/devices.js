const router = require("express").Router();
const Device = require("../models/Device");

//CREATE device
router.post("/", async (req, res) => {
  const newDevice = new Device(req.body);
  try {
    const savedDevice = await newDevice.save();
    res.status(200).json(savedDevice);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE device
router.delete("/:device", async (req, res) => {
    const device = await Device.findOne({device:req.params.device});
    try {
        await device.delete();
        res.status(200).json("device has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
});

//GET ALL devices
router.get("/", async (req, res) => {
    try {
      let devices;
      devices = await Device.find();
      res.status(200).json(devices);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;