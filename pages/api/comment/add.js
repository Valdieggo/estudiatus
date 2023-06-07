import { connectToDatabase } from "../../../utils/db";
import Comment from "../../../models/Comment";
import User from "../../../models/User";
import Post from "../../../models/Post";

export default async function handler(req, res) {
    connectToDatabase();
    const { method } = req;

    switch (method) {
        case "POST":
            try {
                const { creator, text, postId, parent } = req.body;

                if (!creator || !text || !postId) {
                    return res.status(400).json({ success: false, message: "Missing fields" });
                }

                const postDocument = await Post.findById(postId);
                if (!postDocument) {
                    return res.status(400).json({ success: false, message: "Post not found" });
                }

                const userDocument = await User.findById(creator);

                if (!userDocument) {
                    return res.status(400).json({ success: false, message: "User not found" });
                }

                const comment = await Comment.create({
                    creator,
                    text,
                    post: postId,
                    //parent
                });

                //user.comments.push(comment);
                postDocument.comments.push(comment);
                //await user.save();
                await postDocument.save();

                return res.status(201).json({ success: true, data: comment });
            }
            catch (error) {
                return res.status(400).json({ success: false, message: error });
            }
        default:
            return res.status(400).json({ success: false });
    }
}
