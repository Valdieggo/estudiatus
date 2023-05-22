const mongoose = require('mongoose');

const PostDiscussSchema = new mongoose.Schema({

    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
});

module.exports = mongoose.models.Publicacion || mongoose.model("Publicacion", PostDiscussSchema);