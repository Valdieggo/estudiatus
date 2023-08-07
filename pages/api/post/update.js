import { connectToDatabase } from "../../../utils/db";
import Post from "../../../models/Post";

export default async function handler(req, res) {
    const { method } = req;
    const { id, title, content, file, score, view, creator, subject, likes } = req.body;

    if (!id) {
        return res.status(400).json({ success: false, message: "id es requerido" });
    }

    if (!title) {
        return res.status(400).json({ success: false, message: "title es requerido" });
    }

    if (!content) {
        return res.status(400).json({ success: false, message: "content es requerido" });
    }

    if (!creator) {
        return res.status(400).json({ success: false, message: "creator es requerido" });
    }

    if (!subject) {
        return res.status(400).json({ success: false, message: "subject es requerido" });
    }

    if (title.length > 100) {
        return res.status(400).json({ success: false, message: "title es demasiado largo" });
    } else if (title.length < 5) {
        return res.status(400).json({ success: false, message: "title es demasiado corto" });
    }

    try {
        await connectToDatabase();

        switch (method) {
            case "PUT":
                const post = await Post.findByIdAndUpdate(id, {
                    title,
                    content,
                    file,
                    likes,
                    score,
                    view,
                    creator,
                    subject,
                },{ new: true });
                return res.status(200).json({ success: true, data: post });

            default:
                return res.status(400).json({ success: false });
        }
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}
