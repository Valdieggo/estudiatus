import { connectToDatabase } from "../../../../utils/db";
import College from "../../../../models/College";

export default async function handler(req, res) {
    const { method } = req;
    const { getOne } = req.query; // id

    if (!getOne) {
        return res.status(400).json({ success: false, message: "No id provideed" });
    }

    connectToDatabase();

    switch (method) {
        case "GET":
            try {
                const college = await College.findById(getOne);
                return res.status(200).json({success: true, data: college});
            }
            catch (error) {
                return res.status(400).json({ success: false, message: error });
            }
        default:
            return res.status(400).json({ success: false });

    }
}