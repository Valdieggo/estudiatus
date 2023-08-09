import { connectToDatabase } from "../../../utils/db";
import Post from "../../../models/Post";
import Comment from "../../../models/Comment";
import User from "../../../models/User";
import File from "../../../models/File";

export default async function handler(req, res) {
    const { method } =req;

    await connectToDatabase();

    switch (method) {
        case "GET":
            try {
                const posts = await Post.find({}).populate(
                    "creator").populate({
                        path: "comments",
                        model: Comment,
                        populate: {
                            path: "creator",
                            model: User,
                        },
                    }
                ).populate({
                        path: "file",
                        model: File,
                    })
                .sort({ createDate: -1 });
                return res.status(200).json({ success: true, data: posts });
            }
            catch (error) {
                return res.status(400).json({ success: false, message: error });
            }
        default:
            return res.status(400).json({ success: false,message: error });
        }
}