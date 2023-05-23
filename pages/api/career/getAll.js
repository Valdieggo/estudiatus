import { connectToDatabase } from "../../../utils/db";
import Career from "../../../models/Career";

export default async function handler(req, res) {
    const { method } = req;
    await connectToDatabase();

    switch (method) {
        case "GET":
            try {
                const career = await Career.find({});
                return res.status(200).json({ success: true, data: career });
            } catch (error) {
                return res.status(400).json({ success: false, message: error });
            }
        default:
            return res.status(400).json({ success: false });
    }
}


