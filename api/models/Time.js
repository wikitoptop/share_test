const mongoose = require("mongoose");

const TimeSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        time:{
            type:String,
            required:true,
        }
    },
    { timestamps:true }
);

module.exports = mongoose.model("Time",TimeSchema);