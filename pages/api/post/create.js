import { connectToDatabase } from "../../../utils/db";

import Post from "../../../models/Post";
import Subject from "../../../models/Subject";
import User from "../../../models/User";


export default async function handler(req, res) {
    const { method } = req;
    const { title, content, score, view, creator, subject,likes } = req.body;

    if (!title) {
        return res.status(400).json({ success: false, message: "Empty fields" });
    }

    await connectToDatabase();

    switch (method) {
        case "POST":
            try {
                    const post = await Post.create({
                        title,
                        content,
                        likes,
                        score,
                        view,
                        creator,
                        subject,
                    });
                    console.log(post._id)
                    await User.findByIdAndUpdate(creator, {
                        $push: { user: creator._id }
                    });
                    await Subject.findByIdAndUpdate(subject, {
                        $push: { posts: post._id }
                    });
                    return res.status(200).json({ success: true, data: post });
                }
                catch (error) {
                    return res.status(400).json({ success: false, message: error });
                }
        default:
            return res.status(400).json({ success: false, message:error });
    }
}