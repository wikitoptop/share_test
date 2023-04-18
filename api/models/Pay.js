const mongoose = require("mongoose");

const PaySchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
        },
        photo:{
            type:String,
            required:true,
        },
        fee:{
            type:Number,
            required:true,
            default:0.2,
        }
    },
    { timestamps:true }
);

module.exports = mongoose.model("Pay",PaySchema);