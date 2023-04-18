const mongoose = require("mongoose");

const DeviceSchema = new mongoose.Schema(
    {
        device:{
            type:String,
            required:true,
            unique:true,
        }
    },
    { timestamps:true }
);

module.exports = mongoose.model("Device",DeviceSchema);