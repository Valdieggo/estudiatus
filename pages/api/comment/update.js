import { connectToDatabase } from "../../../util/mongodb";
import Comment from "../../../models/Comment";

export default async function handler(req, res) {
    const { method } = req;

    connectToDatabase();

    switch (method) {
        case "PUT":
            try {
                const { id } = req.body;
                const { text } = req.body;

                if (!id || !text) {
                    return res.status(400).json({ success: false, message: "Missing fields" });
                }

                const comment = await Comment.findByIdAndUpdate(id, { text }, { new: true });

                if (!comment) {
                    return res.status(400).json({ success: false, message: "Comment not found" });
                }

                return res.status(200).json({ success: true, data: comment });

            }
            catch (error) {
                return res.status(400).json({ success: false, message: error });

            }

        default:
            return res.status(400).json({ success: false });

    }
}
