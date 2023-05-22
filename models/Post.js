const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, "Titulo obligatorio"],
        unique: true,
    },
    score: {
        type: Number,
        default: 0,
    },
    view :{
        type: Number,
        default: 0,
    },
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    comments:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    },
    subscribers:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    subject:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Asignatura",
    },
    createDate: {
        type: Date.now
    },
});

module.exports = mongoose.models.Post || mongoose.model("Publicacion", PostSchema);