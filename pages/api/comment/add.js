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
                const { creator, text, postId } = req.body;

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

                if(userDocument.comments === undefined){
                    userDocument.comments = [];
                }
                userDocument.comments.push(comment._id);
                postDocument.comments.push(comment._id);
                await userDocument.save();
                await postDocument.save();

                const commentPopulated = await Comment.findById(comment._id).populate('creator');

                return res.status(201).json({ success: true, data: commentPopulated });
            }
            catch (error) {
                return res.status(400).json({ success: false, message: "ansdjkadsnkaj" });
            }
        default:
            return res.status(400).json({ success: false });
    }
}
