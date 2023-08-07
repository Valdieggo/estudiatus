import { connectToDatabase } from "../../../utils/db";
import Subject from "../../../models/Subject";
import User from "../../../models/User";

export default async function handler(req, res) {
    const { method } = req;

    await connectToDatabase();

    switch (method) {
        case "POST":
            try {
                const { subjectId, userId } = req.body;
                console.log(req.body);
                if (!subjectId || !userId) {
                    return res.status(400).json({ success: false, message: "Missing fields" });
                }

                const subject = await Subject.findById(subjectId);

                if (!subject) {
                    return res.status(400).json({ success: false, message: "subject not found" });
                }

                // Check if the user is among the subscribers
                const isSubscribed = subject.subscribers.includes(userId);

                return res.status(200).json({ success: true, data: isSubscribed });
            } catch (error) {
                return res.status(400).json({ success: false, message: error.message });
            }
        default:
            return res.status(400).json({ success: false });
    }
}
