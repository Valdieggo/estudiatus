import { connectToDatabase } from "../../../utils/db";
import Post from "../../../models/Post";
import User from "../../../models/User";

export default async function handler(req, res) {
    const { method } = req;

    connectToDatabase();

    switch (method) {
        case "POST":
            try {
                const { postId, userId } = req.body;

                if (!postId || !userId) {
                    return res.status(400).json({ success: false, message: "Missing fields" });
                }

                const post = await Post.findById(postId);

                if (!post) {
                    return res.status(400).json({ success: false, message: "Post not found" });
                }

                if (!post.likes) {
                    post.likes = [];
                }

                const isLiked = post.likes.includes(userId);

                return res.status(200).json({ success: true, data: isLiked });

            } catch (error) {
                return res.status(400).json({ success: false, message: error });
            }
        default:
            return res.status(400).json({ success: false });
    }
}

