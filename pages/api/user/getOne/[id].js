import { connectToDatabase } from "../../../../utils/db";
import User from "../../../../models/User";


export default async function handler(req, res) {
    const { method } = req;
    const { id } = req.query;

    await connectToDatabase();

    switch (method) {
        case "GET":
            try {
                const user = await User.findById(id)
                if (!user) {
                    return res.status(400).json({ success: false, message: "user not found" });
                }
                return res.status(200).json({ success: true, data: user });
            }
            catch (error) {
                return res.status(400).json({ success: false, message: error });
            }
        default:
            return res.status(400).json({ success: false,message: error });
    }
}