import { connectToDatabase } from "../../../../utils/db";
import Career from "../../../../models/Career";

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
                const college = await Career.findById(getOne);
                return res.status(200).json(college);
            }
            catch (error) {
                return res.status(400).json({ success: false });
            }
        default:
            return res.status(400).json({ success: false });

    }
}