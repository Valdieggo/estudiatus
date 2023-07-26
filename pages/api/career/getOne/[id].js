import { connectToDatabase } from "../../../../utils/db";
import Career from "../../../../models/Career";
import Subject from "../../../../models/Subject";

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
                const career = await Career.findById(id)
                .populate({
                    path: "subjects",
                    model: "Subject",
                })
                return res.status(200).json({success: true, data: career});
            }
            catch (error) {
                return res.status(400).json({ success: false, message: error });
            }
        default:
            return res.status(400).json({ success: false });

    }
}