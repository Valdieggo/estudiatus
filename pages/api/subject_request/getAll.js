import { connectToDatabase } from "../../../utils/db";
import SubjectRequest from "../../../models/SubjectRequest";

export default async function handler(req, res) {
  const { method } = req;

  await connectToDatabase();

  switch (method) {
    case "GET":
      try {
        const subjectRequests = await SubjectRequest.find({});

        res.status(200).json({ success: true, data: subjectRequests });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
