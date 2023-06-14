import { connectToDatabase } from "../../../utils/db";

import Post from "../../../models/Post";
import Subject from "../../../models/Subject";
import User from "../../../models/User";

export default async function handler(req, res) {
    const { method } =req;

    await connectToDatabase();


    switch (method) {
        case "PUT":
            try {
                const { id } = req.query;
                const { title, score, view, creator, subject } = req.body;
                const post = await Post.findByIdAndUpdate(id, {
                    title,
                    score,
                    view,
                    creator,
                    subject,
                });
                if (!post) {
                    return res.status(400).json({ success: false, message: "Post not found" });
                }
                return res.status(200).json({ success: true, data: post });
            }catch{

            }
    }
}