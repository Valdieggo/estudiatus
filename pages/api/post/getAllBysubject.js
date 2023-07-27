import { connectToDatabase } from "../../../utils/db";

import Post from "../../../models/Post";
import Subject from "../../../models/Subject"
import Comment from "../../../models/Comment";
import User from "../../../models/User";

export default async function handler(req, res) {
    const { method } =req;

    await connectToDatabase();

    switch (method) {
        case "GET":
            try {
                const { id } = req.query;
                
                return res.status(200).json({ success: true, data: posts });
            }
            catch (error) {
                return res.status(400).json({ success: false, message: error });
            }
        default:
            return res.status(400).json({ success: false,message: error });
        }
}