const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
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

});

export default mongoose.models.File || mongoose.model("File", FileSchema);