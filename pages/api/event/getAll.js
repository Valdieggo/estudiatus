import { connectToDatabase } from '../../../utils/db';
import Event from '../../../models/Event';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const db = await connectToDatabase();

    // Fetch all events from the database using your Event model
    const events = await Event.find();

    return res.status(200).json({ events });
  } catch (error) {
    console.error('Error fetching events:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}