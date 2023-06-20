import { connectToDatabase } from "../../../utils/db";
import Comment from "../../../models/Comment";

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                connectToDatabase();
                const comments = await Comment.find({}).populate("creator");
                return res.status(200).json({ success: true, data: comments });
            }
            catch (error) {
                return res.status(400).json({ success: false, message: error });
            }
        default:
            return res.status(400).json({ success: false });
    }
}
