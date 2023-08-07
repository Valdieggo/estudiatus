const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    originalName: {
        type: String,
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
        sparse: true,
    },
    size: {
        type: Number,
        required: true,

    },
    mimetype: {
        type: String,
        required: true,
    },

    dateUpload: {
        type: Date,
        default: Date.now,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

});

export default mongoose.models.File || mongoose.model("File", FileSchema);