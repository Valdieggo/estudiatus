import { connectToDatabase } from '../../../utils/db';
import Event from '../../../models/Event';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  try {
    const db = await connectToDatabase();
    const eventData = req.body;

    const newEvent = new Event(eventData);
    await newEvent.save();

    return res.status(201).json({ message: 'Evento creado correctamente' });
  } catch (error) {
    console.error('Error creating event:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}