import { connectToDatabase } from "../../../utils/db";
import Career from "../../../models/Career";
import User from "../../../models/User";

export default async function handler(req, res) {
    const { method } = req;

    await connectToDatabase();

    switch (method) {
        case "POST":
            try {
                const { careerId, userId } = req.body;
                console.log(req.body);
                if (!careerId || !userId) {
                    return res.status(400).json({ success: false, message: "Missing fields" });
                }

                const career = await Career.findById(careerId);

                if (!career) {
                    return res.status(400).json({ success: false, message: "Career not found" });
                }

                // Check if the user is among the subscribers
                const isSubscribed = career.subscribers.includes(userId);

                return res.status(200).json({ success: true, data: isSubscribed });
            } catch (error) {
                return res.status(400).json({ success: false, message: error.message });
            }
        default:
            return res.status(400).json({ success: false });
    }
}
