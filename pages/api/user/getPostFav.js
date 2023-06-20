import { connectToDatabase } from "../../../utils/db";
import User from "../../../models/User";

export default async function handler(req, res) {
    const { method } = req;

    connectToDatabase();

    switch (method) {
        case "POST":
            try {
                const { postId, userId } = req.body;
                
                if (!postId || !userId) {
                    return res.status(400).json({ success: false, message: "Missing fields", data: { postId, userId } });
                }

                const user = await User.findById(userId);

                if (!user) {
                    return res.status(400).json({ success: false, message: "User not found" });
                }

                if (!user.favs) {
                    user.favs = [];
                }

                const isFav = user.favs.includes(postId);

                return res.status(200).json({ success: true, data: isFav });

            } catch (error) {
                return res.status(400).json({ success: false, message: error });
            }
        default:
            return res.status(400).json({ success: false });
    }
}