import { connectToDatabase } from "../../../utils/db";
import Comment from "../../../models/Comment";
import User from "../../../models/User";

export default async function handler(req, res) {
    const { method } = req;

    connectToDatabase();

    switch (method) {
        case "PUT":
            try {
                const { commentId, userId } = req.body;

                if (!commentId || !userId) {
                    return res.status(400).json({ success: false, message: "Missing fields" });
                }

                const comment = await Comment.findById(commentId);

                if (!comment) {
                    return res.status(400).json({ success: false, message: "Comment not found" });
                }

                const likesSet = new Set(likes.map(id => id.toString()));//convertir a string para que no haya problemas con el set de javascript

                if (likesSet.has(userId)) {
                    likesSet.delete(userId);
                }
                else {
                    likesSet.add(userId);
                }

                comment.likes = Array.from(likesSet);
                comment.score = comment.likes.length;
                
                await comment.save();

                return res.status(200).json({ success: true, data: comment.likes });

            }
            catch (error) {
                return res.status(400).json({ success: false, message: error });

            }
        default:
            return res.status(400).json({ success: false });
    }
}

