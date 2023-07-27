const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Titulo obligatorio"],
        minLenght:1,
        maxLenght: 50,
    },
    content: {
        type: String,
        required: [true, "Contenido obligatorio"],
        minLenght:1,
        maxLenght: 500,
    },
    score: {
        type: Number,
        default: 0,
        validate:{
            validator: Number.isInteger,
            message: "{VALUE} no es un valor entero",
        }
    },
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    view :{
        type: Number,
        default: 0,
    },
    creator:{
        required: [true, "Creador obligatorio"],
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    }],
    subs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    subject:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
    },
    createDate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.models.Post || mongoose.model("Post", PostSchema);