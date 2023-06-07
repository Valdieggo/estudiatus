import { connectToDatabase } from "../../../utils/db";
import Comment from "../../../models/Comment";
import User from "../../../models/User";
import Post from "../../../models/Post";

export default async function handler(req, res) {
    connectToDatabase();
    const { method } = req;
    const { id } = req.query; // id

    if (!id) {
        return res.status(400).json({ success: false, message: "No id provideed" });
    }

    switch (method) {
        case "GET":
            return
        case "POST":
            try {
                const { creator, text, postId, parent } = req.body;
                const comment = await Comment.create({
                    creatorId: creator,
                    text,
                    postId,
                    parent
                });
                const user = await User.findById(creator);
                const post = await Post.findById(post);
                user.comments.push(comment);
                post.comments.push(comment);
                await user.save();
                await post.save();
                return res.status(200).json({ success: true, data: comment });
            }
            catch (error) {
                return res.status(400).json({ success: false, message: error });
            }
        default:
            return res.status(400).json({ success: false });
            //break;
    }
}
