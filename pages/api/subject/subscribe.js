import { connectToDatabase } from "../../../utils/db";
import Subject from "../../../models/Subject";
import User from "../../../models/User";

export default async function handler(req, res) {
    const { method } = req;

    await connectToDatabase();

    switch (method) {
        case "PUT":
            try {
                const { subjectId, userId } = req.body;

                if (!subjectId || !userId) {
                    return res.status(400).json({ success: false, message: "Missing fields" });
                }

                const subject = await Subject.findById(subjectId);
                const user = await User.findById(userId);

                if (!user) {
                    return res.status(400).json({ success: false, message: "User not found" });
                }

                if (!subject) {
                    return res.status(400).json({ success: false, message: "subject not found" });
                }

                const subscribersSet = new Set(subject.subscribers.map(id => id.toString()));

                if (subscribersSet.has(userId)) {
                    subscribersSet.delete(userId);
                } else {
                    subscribersSet.add(userId);
                }

                subject.subscribers = Array.from(subscribersSet);
                await subject.save();
                
                return res.status(200).json({ success: true, data: subject.subscribers });
            } catch (error) {
                return res.status(400).json({ success: false, message: error.message });
            }
        default:
            return res.status(400).json({ success: false, message: "Unsupported request method" });
    }
}
