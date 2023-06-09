import { connectToDatabase } from "../../../utils/db";

import Post from "../../../models/Post";

export default async function handler(req, res) {
    const { method } =req;
    await connectToDatabase();

    switch (method) {
        case "GET":
            try {
                const posts = await Post.find({});
                return res.status(200).json({ success: true, data: posts });
            }
            catch (error) {
                return res.status(400).json({ success: false, message: error });
            }
        default:
            return res.status(400).json({ success: false });
        }
}