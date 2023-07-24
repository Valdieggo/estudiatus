const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    reason : {
        type: String,
        required: [true, "Please provide a reason"],
        maxLength: [100, "Reason cannot be more than 100 characters"],
    },
    description : {
        type: String,
        required: [true, "Please provide a description"],
        minLength: [10, "Description cannot be less than 10 characters"],
        maxLength: [300, "Description cannot be more than 300 characters"],
    },
    reportUser : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    reportedUser : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    post : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: false,
    },
    status : {
        type: String,
        enum: ["solve", "pending", ],
        default: "pending",
    },

});

module.exports =  mongoose.models.Report || mongoose.model("Report", ReportSchema);


