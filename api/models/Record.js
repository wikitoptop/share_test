const mongoose = require("mongoose");

const RecordSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
        },
        device:{
            type:String,
            required:true,
            unique:true,
        }
    },
    { timestamps:true }
);

module.exports = mongoose.model("Record",RecordSchema);