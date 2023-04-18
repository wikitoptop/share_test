const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        username:{
            type:String,
            required:true,
        },
        time:{
            type:String,
            required:true,
        },
        day:{
            type:String,
            required:true,
        },
        device:{
            type:String,
            required:true,
            unique:true,
        }
    },
    { timestamps:true }
);

module.exports = mongoose.model("Book",BookSchema);