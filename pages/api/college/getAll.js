import { connectToDatabase } from "../../../utils/db";
import College from "../../../models/College";

export default async function handler(req, res) {
    const { method } = req;
    await connectToDatabase();

    switch (method) {
        case "GET":
            try {
                const colleges = await College.find({});
                return res.status(200).json({ success: true, data: colleges });
            } catch (error) {
                return res.status(400).json({ success: false, message: error });
            }
        default:
            return res.status(400).json({ success: false });
    }
}


