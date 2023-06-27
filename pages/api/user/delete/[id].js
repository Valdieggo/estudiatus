import { connectToDatabase } from "../../../../utils/db";
import User from "../../../../models/user";


export default async function handler(req, res) {
    const { method } = req;
    const { id } = req.query;

    await connectToDatabase();

    switch (method) {
        case "DELETE":
            try {
                const user = await User.findByIdAndDelete(id);
                if (!user) {
                    return res.status(400).json({ success: false, message: "user not found" });
                }
                await user.remove();
                return res.status(200).json({ success: true, data: user });
            }
            catch (error) {
                return res.status(400).json({ success: false, message: error });
            }
        default:
            return res.status(400).json({ success: false,message: error });
    }
}