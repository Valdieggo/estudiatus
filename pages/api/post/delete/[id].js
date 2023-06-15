import { connectToDatabase } from "../../../../utils/db";

import Post from "../../../../models/Post";
import Subject from "../../../../models/Subject";
import User from "../../../../models/User";

export default async function handler(req, res) {
    const { method } = req;
    const { id } = req.query;

    await connectToDatabase();

    switch (method) {
        case "DELETE":
            try {
                const post = await Post.findByIdAndDelete(id);
                if (!post) {
                    return res.status(400).json({ success: false, message: "Post not found" });
                }
                await post.remove();

                await Subject.findByIdAndUpdate(post.subject,{
                    $pull: { post: post._id }
                })

                return res.status(200).json({ success: true, data: post });
            }
            catch (error) {
                return res.status(400).json({ success: false, message: error });
            }
        default:
            return res.status(400).json({ success: false,message: error });
    }
}