import { connectToDatabase } from "../../../../utils/db";
import Comment from "../../../../models/Comment";
import Post from "../../../../models/Post";
import User from "../../../../models/User";
import File from "../../../../models/File";

export default async function handler(req, res) {
    const { method } = req;
    const { id } = req.query;

    await connectToDatabase();

    switch (method) {
        case "GET":
            try {
                const post = await Post.findById(id).populate(
                    "creator").populate({
                        path: "comments",
                        model: Comment,
                        populate: {
                            path: "creator",
                            model: User,
                        },
                    }
                    .populate({
                        path: "file",
                        model: File,
                    })
                );


                if (!post) {
                    return res.status(400).json({ success: false, message: "Post not found" });
                }
                return res.status(200).json({ success: true, data: post });
            }
            catch (error) {
                return res.status(400).json({ success: false, message: error });
            }
        default:
            return res.status(400).json({ success: false,message: error });
    }
}