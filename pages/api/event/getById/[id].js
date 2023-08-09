import { connectToDatabase } from "../../../../utils/db";
import Event from "../../../../models/Event";

export default async function handler(req, res) {
  const { method, query } = req;

  if (method !== "GET") {
    return res.status(400).json({ success: false, message: "Invalid method" });
  }

  const { id } = query;

  await connectToDatabase();

  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }
    res.status(200).json({ success: true, data: event });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}