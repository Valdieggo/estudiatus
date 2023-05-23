import { connectToDatabase } from "../../../utils/db";
import College from "../../../models/College";

export default async function handler(req, res) {
    const { method } = req;
    const { collegeName } = req.body;

    if (!collegeName) {
        return res.status(400).json({ success: false, message: "Empty college name" });
    }

    await connectToDatabase();

    if (await College.findOne({ collegeName })) {
        return res.status(409).json({ sucess: false, message: "College already exists" });
    }

    switch (method) {
        case "POST":
            try {
                const college = await College.create({
                    collegeName,
                });
                return res.status(200).json({ success: true, data: college });
            } catch (error) {
                return res.status(400).json({ success: false, message: error });
            }
        default:
            return res.status(400).json({ success: false });
    }
}


