const mongoose = require('mongoose');

const DiscussSchema = new mongoose.Schema({

    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
});

module.exports = mongoose.models.Discuss || mongoose.model("Discuss", DiscussSchema);