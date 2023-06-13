const mongoose = require('mongoose');

const PostDiscussSchema = new mongoose.Schema({

    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    file:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
    }
});

module.exports = mongoose.models.Publicacion || mongoose.model("Publicacion", PostDiscussSchema);