import { connectToDatabase } from "../../../../utils/db";
import Event from "../../../../models/Event";

export default async function handler(req, res) {
  const { method, query } = req;

  if (method !== "DELETE") {
    return res.status(400).json({ success: false, message: "Método Inválido" });
  }

  const { id } = query;

  await connectToDatabase();

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ success: false, message: "Evento no encontrado" });
    }
    res.status(200).json({ success: true, message: "Evento borrado" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}