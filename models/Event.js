const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({

    eventName: {
        type: String,
        required: true,
    },
    eventDate: {
        type: Date,
        required: true,
    },
    eventlocation: {
        type: String,
        required: true,
    },
    eventDescription: {
        type: String,
        required: true,
        maxLength: [300, "Event description cannot be more than 300 characters"]
    },
    eventCreator: {
        type: Schema.Objectid,
        ref: "user",
        required: true,
    },
    eventType: {
        type: String,
        enum: ['Global', 'Carrera', 'Asignatura'],
        required: true,
    },
    eventParticipants: {
        type: [Schema.Objectid],
        ref: "user",
        required: false,
    },

});

module.exports = mongoose.model('Event', eventSchema);