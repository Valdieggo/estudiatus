const mongoose = require('mongoose');

const appealSchema = new mongoose.Schema({
    name:   {
        type: String,
        required:true,
        minLength:1,
        maxLength:100

    },
    description: {
        type: String,
        required: true,
        minLength: 1,
        maxLength:1000
    },
    ban: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Ban",
        required: true
    },
    appealer: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    status: {
        type: String,
        enum:["En proceso", "Aprovada", "Rechazada"],
        default: "En proceso"
    }

});

module.exports = mongoose.models.Appeal || mongoose.model("Appeal", appealSchema);