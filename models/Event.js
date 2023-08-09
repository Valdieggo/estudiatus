const mongoose = require('mongoose');

let Event;

try {
  // Try to get the existing 'Event' model
  Event = mongoose.model('Event');
} catch (error) {
  // If the model doesn't exist, define and compile it
  const EventSchema = new mongoose.Schema({
    eventName: {
      type: String,
      required: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    eventLocation: {
      type: String,
      required: true,
    },
    eventDescription: {
      type: String,
      required: true,
      maxLength: [300, 'Event description cannot be more than 300 characters'],
    },
    eventCreator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    eventType: {
      type: String,
      enum: ['Global', 'Carrera', 'Asignatura'],
      required: true,
    },
    eventTime: {
      type: String,
      required: true,
    },
  });

  Event = mongoose.model('Event', EventSchema);
}

module.exports = Event;