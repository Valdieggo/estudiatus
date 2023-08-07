import { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } from "../controllers/eventController.js";

export default async function handler(req, res) {
  await connectToDatabase();
  switch (req.method) {
    case "POST":
      await createEvent(req, res);
      break;
    case "GET":
      const { id } = req.query;
      if (id) {
        await getEventById(req, res);
      } else {
        await getAllEvents(req, res);
      }
      break;
    case "PUT":
      await updateEvent(req, res);
      break;
    case "DELETE":
      await deleteEvent(req, res);
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}