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

                if (!post) {
                    return res.status(400).json({ success: false, message: "Post not found" });
                }

                const user = await User.findById(userId);

                if (!user) {
                    return res.status(400).json({ success: false, message: "User not found" });
                }

                if (user.favs.includes(postId)) {
                    user.favs = user.favs.filter(id => id.toString() !== postId);
                } else {
                    user.favs.push(postId);
                }

                await user.save();

                return res.status(200).json({ success: true, data: user.favs });

            } catch (error) {
                return res.status(400).json({ success: false, message: error });
            }
        default:
            return res.status(400).json({ success: false });
    }
}

