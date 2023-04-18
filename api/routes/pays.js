const router = require("express").Router();
const Pay = require("../models/Pay");
//create a pay

router.post("/", async (req, res) => {
  const newPay = new Pay(req.body);
  try {
    const savedPay = await newPay.save();
    res.status(200).json(savedPay);
  } catch (err) {
    res.status(500).json(err);
  }
});
  

//UPDATE Pay
router.put("/:id", async (req, res) => {
    try {
      const pay = await Pay.findById(req.params.id);
      if (pay.username === req.body.username) {
        try {
          const updatedPay = await Pay.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedPay);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can update only yours!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //GET ALL pays
router.get("/", async (req, res) => {
  try {
    let pays;
    pays = await Pay.find();
    res.status(200).json(pays);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE Pay
router.delete("/:username", async (req, res) => {
  const pay = await Pay.findOne({username:req.params.username});
      try {
        await pay.delete();
        res.status(200).json("pay has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } 
);

  module.exports = router;