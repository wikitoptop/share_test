const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "tx.jpg",
    },
    cash:{
      type:Number,
      required:true,
      default:1
    },
    isAdmin:{
      type:Boolean,
      required:false,
      default:false,
    },
    useraddress:{
      type:String,
      required:false,
      default:"用户未分享位置",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
