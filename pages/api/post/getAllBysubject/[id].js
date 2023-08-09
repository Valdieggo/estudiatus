import { connectToDatabase } from "../../../../utils/db";
import Post from "../../../../models/Post";
import Subject from "../../../../models/Subject";
import User from "../../../../models/User";
import Comment from "../../../../models/Comment";
import File from "../../../../models/File"

export default async function handler(req, res) {
    const { method } = req;

    await connectToDatabase();

    switch (method) {
        case "GET":
            try {
                // Extract idSubjectAll from request parameters
                const { id } = req.query;
                // Check if idSubjectAll is present
                if (!id) {
                    return res.status(400).json({ success: false, message: "idSubjectAll parameter missing" });
                }
                // Find the subject by its ID
                const subject = await Subject.findById(id);
                if (!subject) {
                    return res.status(404).json({ success: false, message: "Subject not found" });
                }
                // Find all posts that belong to the subject
                const posts = await Post.find({ subject: subject._id })
                    .populate("creator")
                    .populate({
                        path: "comments",
                        model: Comment,
                        populate: {
                            path: "creator",
                            model: User,
                        },
                    })
                    .populate({
                        path: "file",
                        model: File,
                    })
                    .sort({ createDate: -1 });
                return res.status(200).json({ success: true, data: posts });
            } catch (error) {
                return res.status(400).json({ success: false, message: error.message });
            }
        default:
            return res.status(400).json({ success: false, message: "Invalid method" });
    }
}
