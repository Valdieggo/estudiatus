import { connectToDatabase } from "../../../../utils/db";

import Post from "../../../../models/Post";

export default async function handler(req, res) {
    const { method } = req;
    const { id } = req.query;

    await connectToDatabase();

    switch (method) {
        case "GET":
            try {
                const post = await Post.findById(id).populate({
                    path: 'comments',
                    populate: {
                      path: 'creator',
                    },
                  })
                  .populate('creator');
                  
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