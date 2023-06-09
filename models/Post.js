const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Titulo obligatorio"],
        minLenght:1,
        maxLenght: 50,
    },
    score: {
        type: Number,
        default: 0,
        validate:{
            validator: Number.isInteger,
            message: "{VALUE} no es un valor entero",
        }
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
        ref: "Collage",
    },
    createDate: {
        type: Date.now
    },
});

module.exports = mongoose.models.Post || mongoose.model("Publicacion", PostSchema);