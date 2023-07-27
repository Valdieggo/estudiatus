import { connectToDatabase } from "../../../utils/db";

import Post from "../../../models/Post";
import Subject from "../../../models/Subject"
import Comment from "../../../models/Comment";
import User from "../../../models/User";

export default async function handler(req, res) {
    const { method } = req;

    await connectToDatabase();

    switch (method) {
        case "GET":
            try {
                // Extract idSubjectAll from request parameters
                const { id } = req.query;

                // Check if idSubjectAll is present
                if (!id) {
                    return res.status(400).json({ success: false, message: "idSubjectAll parameter missing" });
                }

                const post = await Post.findOne({ id }).populate(
                    "creator").populate({
                        path: "comments",
                        model: "Comment",
                        populate: {
                            path: "creator",
                            model: "User",
                        },
                    }
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
            return res.status(400).json({ success: false, message: "Invalid method" });
    }
}