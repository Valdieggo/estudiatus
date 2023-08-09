import { connectToDatabase } from "../../../utils/db";
import Event from "../../../models/Event";

export default async function handler(req, res) {
  const { method, query, body } = req;

  if (method !== "PUT") {
    return res.status(400).json({ success: false, message: "Método inválido" });
  }

  const { id } = query;
  const { eventData } = body;

  await connectToDatabase();

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      eventData,
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ success: false, message: "Evento no encontrado" });
    }

    res.status(200).json({ success: true, data: updatedEvent });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}