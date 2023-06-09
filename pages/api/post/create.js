import { connectToDatabase } from "../../../utils/db";

import Post from "../../../models/Post";

export default async function handler(req, res) {
    const { method } = req;
    const { title, score, view, creator, comments, subscribers, subject, createDate } = req.body;

    if (!title || !score || !view || !creator || !comments || !subscribers || !subject || !createDate) {
        return res.status(400).json({ success: false, message: "Empty fields" });
    }

    await connectToDatabase();

    switch (method) {
        case "POST":
            try {
                    const post = await Post.create({
                        title,
                        score,
                        view,
                        creator,
                        comments,
                        subscribers,
                        subject,
                        createDate
                    });
                    return res.status(200).json({ success: true, data: post });
                }
                catch (error) {
                    return res.status(400).json({ success: false, message: error });
                }
        default:
            return res.status(400).json({ success: false });
    }

}