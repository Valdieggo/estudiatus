const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({

    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Usuario obligatorio"],
    },
    text:{
        type: String,
        required: [true, "Texto obligatorio"],
    },
    score:{
        type: Number,
        default: 0,
    },
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    createDate:{
        type: Date,
        default: Date.now
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: [true, "Post obligatorio"],
    },
    parent:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    },
    children:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    }]
});

module.exports = mongoose.models.Comment || mongoose.model("Comment", CommentSchema);