const mongoose = require("mongoose");

const SubjectRequestSchema = mongoose.Schema({
  subjectName: {
    type: String,
    minLenght: 1,
    maxLenght: 100,
    required: true,
  },
  college: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "College",
  },
  career: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "Career",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  requestingUser: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "User",
  },
  description: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 1000,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
});

module.exports =
  mongoose.models.SubjectRequest ||
  mongoose.model("SubjectRequest", SubjectRequestSchema);
