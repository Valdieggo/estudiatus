import { connectToDatabase } from "../../../utils/db";
import Post from "../../../models/Post";
import User from "../../../models/User";

export default async function handler(req, res) {
    const { method } = req;

    connectToDatabase();

    switch (method) {
        case "PUT":
            try {
                const { postId, userId } = req.body;

                if (!postId || !userId) {
                    return res.status(400).json({ success: false, message: "Missing fields" });
                }

                const post = await Post.findById(postId);
                
                const user = await User.findById(userId);

                if (!user) {
                    return res.status(400).json({ success: false, message: "User not found" });
                }

                if (!post) {
                    return res.status(400).json({ success: false, message: "Post not found" });
                }

                const likesSet = new Set(post.likes.map(id => id.toString()));

                if (likesSet.has(userId)) {
                    likesSet.delete(userId);
                } else {
                    likesSet.add(userId);
                }

                post.likes = Array.from(likesSet);
                post.score = post.likes.length;

                await post.save();

                return res.status(200).json({ success: true, data: post.likes });
            } catch (error) {
                return res.status(400).json({ success: false, message: error });
            }
        default:
            return res.status(400).json({ success: false });
    }
}