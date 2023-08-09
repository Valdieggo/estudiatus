import { connectToDatabase } from "../../../../utils/db";
import User from "../../../../models/User";
import Post from "../../../../models/Post";
import Comment from "../../../../models/Comment";
import File from "../../../../models/File";

export default async function handler(req, res) {
    const { method } = req;
    const { id } = req.query;

    await connectToDatabase();

    switch (method) {
        case "GET":
            try {
                const user = await User.findById(id)
                    .populate({
                        path: "favs",
                        model: Post,
                        populate: [{
                            path: "creator",
                            model: User,
                        },
                        {
                            path: "file",
                            model: File,
                        }]

                    }).populate({
                        path: "posts",
                        model: Post,
                        populate: [{
                            path: "creator",
                            model: User,
                        },
                        {
                            path: "file",
                            model: File,
                        }
                        ]
                    })

                if (!user) {
                    return res.status(400).json({ success: false, message: "user not found" });
                }
                return res.status(200).json({ success: true, data: user });
            }
            catch (error) {
                return res.status(400).json({ success: false, message: error });
            }
        default:
            return res.status(400).json({ success: false,message: error });
    }
}