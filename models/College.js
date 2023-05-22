const mongoose = require('mongoose');

const CollegeSchema = new mongoose.Schema({
    collegeName: {
        type: String,
        unique: true,
        required: [true, "Please provide a college name"],
        maxLength: [100, "College name cannot be more than 100 characters"],
    },
    img: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File"
    },
    careers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Career"
    }

})

module.exports =  mongoose.model("College", CollegeSchema);