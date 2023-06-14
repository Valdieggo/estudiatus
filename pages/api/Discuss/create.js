import { connectToDatabase } from "../../../utils/db";

import Discuss from "../../../models/Discuss";

export default async function handler(req, res) {
    const { method } = req;
    const {post}=req.body;

    if (!post) {
        return res.status(400).json({ success: false, message: "Empty fields" });
    }

    await connectToDatabase();

    switch (method) {
        case "POST":
            try {
                    const discuss = await Discuss.create({
                        post
                    });
                    return res.status(200).json({ success: true, data: discuss });
                }
                catch (error) {
                    return res.status(400).json({ success: false, message: error });
                }
        default:
            return res.status(400).json({ success: false, message: error });
    }
}