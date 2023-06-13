import { connectToDatabase } from "../../../utils/db";

import Post from "../../../models/Post";

export default async function handler(req, res) {
    const { method } =req;

    const { title, score, view, creator, subject } = req.body;

    await connectToDatabase();

    switch (method) {
        case "PUT":
            try {
                const post = await Post.findByIdAndUpdate({
                    title: req.body.title,
                    score: req.body.score,
                    view: req.body.view,
                    creator: req.body.creator,
                    comments: req.body.comments,
                    subscribers: req.body.subscribers,
                    subject: req.body.subject,
                })
                return res.status(200).json({ success: true, data: post });
            } catch(error){
                return res.status(400).json({ success: false, message: error });
            }
        default:
            return res.status(400).json({ success: false, message: error});
        }
}