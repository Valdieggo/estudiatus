import { connectToDatabase } from "../../../../utils/db";
import Subject from "../../../../models/Subject";
import File from "../../../../models/File";

export default async function handler(req, res) {
    const { method } = req;
    const { id } = req.query; // id

    if (!id) {
        return res.status(400).json({ success: false, message: "No ID provideed" });
    }

    connectToDatabase();

    switch (method) {
        case "GET":
            try {
                const subject = await Subject.findById(id)
                .populate({
                    path: "img",
                    model: "File",
                })
                return res.status(200).json({ success: true, data: subject });
            }
            catch (error) {
                return res.status(400).json({ success: false, message: error });
            }
        default:
            return res.status(400).json({ success: false });

    }
}