const mongoose = require('mongoose');

const CareerSchema = new mongoose.Schema({
    careerName: {
        type: String,
        required: [true, "Please provide a career name"],
        maxLength: [100, "Subject name cannot be more than 100 characters"],
    },
    description: {
        type: String,
        required: [true, "Please provide a description"],
        minLength: [1, "Description cannot be less than 10 characters"],
        maxLength: [300, "Carrer description cannot be more than 300 characters"],
    },
    img: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File"
    },
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "College",
        required: [true, "Please provide a college"],
    },
    subjects: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Subject"
    },
    subscribers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
    }

})

module.exports = mongoose.models.Career || mongoose.model("Career", CareerSchema);