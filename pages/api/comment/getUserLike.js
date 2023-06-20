import { connectToDatabase } from "../../../utils/db";
import Comment from "../../../models/Comment";

export default async function handler(req, res) {
    const { method } = req;

    connectToDatabase();

    switch (method) {
        case "POST":
            try {
                const { commentId, userId } = req.body;

                if (!commentId || !userId) {
                    return res.status(400).json({ success: false, message: "Missing fields" });
                }

                const comment = await Comment.findById(commentId);

                if (!comment) {
                    return res.status(400).json({ success: false, message: "Comment not found" });
                }

                if (!comment.likes) {
                    comment.likes = [];
                }

                const isLiked = comment.likes.includes(userId);

                return res.status(200).json({ success: true, data: isLiked });

            } catch (error) {
                return res.status(400).json({ success: false, message: error });
            }
        default:
            return res.status(400).json({ success: false });
    }
}