import { connectToDatabase } from "../../../../utils/db";
//import Event from "../../../../models/Event";

export default async function handler(req, res) {
  const { method, query } = req;

  if (method !== "DELETE") {
    return res.status(400).json({ success: false, message: "Invalid method" });
  }

  const { id } = query;

  await connectToDatabase();

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }
    res.status(200).json({ success: true, message: "Event deleted" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}