const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
          },
        postId: {
            type: String,
            required: true,
          },
        comdesc:{
            type:String,
            required:true,
        },
        username:{
            type:String,
            required:true,
        },
        parentId: {
            type:mongoose.ObjectId,
            required:false
        },
        rootId: {
            type:mongoose.ObjectId,
            required:false
        },
    },
    { timestamps:true }
);

module.exports = mongoose.model("Comment",CommentSchema);