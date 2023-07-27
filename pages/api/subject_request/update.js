import { connectToDatabase } from "../../../utils/db";
import SubjectRequest from "../../../models/SubjectRequest";

export default async function handler(req, res) {
  const { method } = req;

  await connectToDatabase();

  switch (method) {
    case "PUT":
      try {
        const subjectRequest = await SubjectRequest.findByIdAndUpdate(
          req.body._id,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );

        if (!subjectRequest) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: subjectRequest });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
