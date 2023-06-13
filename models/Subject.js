const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    subjectName: {
        type: String,
        required: [true, "Please provide a subject name"],
        maxLength: [100, "Subject name cannot be more than 100 characters"],
    },
    description: {
        type: String,
        required: [true, "Please provide a description"],
        minLength: [10, "Description cannot be less than 10 characters"],
        maxLength: [300, "Subject description cannot be more than 300 characters"],
    },
    date: {
        type: Date,
        default: Date.now,
    },
    subscribers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
    },
    posts: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Post",
        required:false
    },
    career: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Career",
    }
})

module.exports =  mongoose.models.Subject || mongoose.model("Subject", SubjectSchema);