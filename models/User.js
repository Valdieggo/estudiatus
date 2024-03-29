const mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    role: {
        enum: ["user", "admin"],
        type: String,
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    birthday: {
        type: Date,
        required: [true, "Please provide a birthday"],
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
    ],
    favs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
    isBanned: {
        type: Boolean,
        default: false,
    },
    img: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
    },
    score: {
        type: Number,
        default: 0,
    },
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "College",
    },

});

export default mongoose.models.User || mongoose.model("User", UserSchema);