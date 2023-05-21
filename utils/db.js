

export async function connectToDatabase() {
    const mongoose = require('mongoose');

    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
        throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
    }

    return mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });



}

