import { connectToDatabase } from "../../../utils/db";
import User from "../../../models/User";

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                connectToDatabase();
                const Users = await User.find({});
                return res.status(200).json({ success: true, data: Users });
            }
            catch (error) {
                return res.status(400).json({ success: false, message: error });
            }
        default:
            return res.status(400).json({ success: false });
    }
}
