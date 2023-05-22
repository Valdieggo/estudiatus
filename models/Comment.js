const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({

    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    text:{
        type: String,
        required: [true, "Texto obligatorio"],
    },
    score:{
        type: Number,
    },
    crateDate:{
        type: Date.now
    },
});

module.exports = mongoose.models.Comment || mongoose.model("Comment", CommentSchema);