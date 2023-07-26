import { connectToDatabase } from "../../../../utils/db";
import College from "../../../../models/College";
import Career from "../../../../models/Career";

export default async function handler(req, res) {
    const { method } = req;
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ success: false, message: "No ID provideed" });
    }

    connectToDatabase();

    switch (method) {
        case "GET":
            try {
                //populate a careers que es una lista
                const college = await College.findById(id).populate({
                    path: "careers",
                    model: "Career",
                });

                if (!college) {
                    return res.status(400).json({ success: false, message: "No college found" });
                }
                return res.status(200).json({success: true, data: college});
            }
            catch (error) {
                return res.status(400).json({ success: false, message: error });
            }
        default:
            return res.status(400).json({ success: false });

    }
}