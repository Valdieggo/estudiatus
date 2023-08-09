import { connectToDatabase } from "../../../../utils/db";
import Post from "../../../../models/Post";

import File from "../../../../models/File"
import User from "../../../../models/User";
import axios from "axios";

export default async function handler(req, res) {
    const { method } = req;
    const { id } = req.query;

    await connectToDatabase();

    switch (method) {
        case "DELETE":
            try {
                const findID = await Post.findById(id);
                if (findID.file) {
                    await File.findByIdAndDelete(findID.file);
                }
                if (findID.comments.length > 0) {
                    await Promise.all(findID.comments.map(async (comment) => {
                        await axios.delete(`http://localhost:${process.env.PORT}/api/comment/delete/${comment._id}`);
                    }));
                }


                const user = await User.findById(findID.creator);


                const post = await Post.findByIdAndDelete(id);
                if (!post) {
                    return res.status(400).json({ success: false, message: "Post not found" });
                }

                return res.status(200).json({ success: true, data: post });
            }
            catch (error) {
                return res.status(400).json({ success: false, message: error });
            }
        default:
            return res.status(400).json({ success: false, message: error });
    }
}