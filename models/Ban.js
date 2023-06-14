const mongoose = require('mongoose');

const banShema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    type: {
        type: String,
        enum: ["ban", "mute", "shadowban"],
        required: [true, "Please provide a ban type"],
    },
    time : {
        type:Date,
        required: [true, "Please provide a ban time"],
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    },
    report: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Report",
    },

});

module.exports = mongoose.models.Ban || mongoose.model("Ban", banShema);

