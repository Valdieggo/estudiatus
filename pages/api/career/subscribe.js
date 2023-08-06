import { connectToDatabase } from "../../../utils/db";
import Career from "../../../models/Career";
import User from "../../../models/User";

export default async function handler(req, res) {
    const { method } = req;

    await connectToDatabase();

    switch (method) {
        case "PUT":
            try {
                const { careerId, userId } = req.body;

                if (!careerId || !userId) {
                    return res.status(400).json({ success: false, message: "Missing fields" });
                }

                const career = await Career.findById(careerId);
                const user = await User.findById(userId);

                if (!user) {
                    return res.status(400).json({ success: false, message: "User not found" });
                }

                if (!career) {
                    return res.status(400).json({ success: false, message: "Career not found" });
                }

                const subscribersSet = new Set(career.subscribers.map(id => id.toString()));

                if (subscribersSet.has(userId)) {
                    subscribersSet.delete(userId);
                } else {
                    subscribersSet.add(userId);
                }

                career.subscribers = Array.from(subscribersSet);
                await career.save();
                
                return res.status(200).json({ success: true, data: career.subscribers });
            } catch (error) {
                return res.status(400).json({ success: false, message: error.message });
            }
        default:
            return res.status(400).json({ success: false, message: "Unsupported request method" });
    }
}
