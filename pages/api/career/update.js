import { connectToDatabase } from "../../../utils/db";
import College from "../../../models/Career";

export default async function handler(req, res) {
    const { method } = req;
    const { id, collegeName } = req.body;

    /* TODO
    if (!id) {
        return res.status(400).json({ success: false, message: "Empty fields" });
    }

    connectToDatabase();

    if (await College.findOne({ collegeName })) {
        return res.status(409).json({ sucess: false, message: "College already exists" });
    }

    switch (method) {
        case "PUT":
            try {
                const college = await College.findByIdAndUpdate(id, {
                    collegeName,
                });
                return res.status(200).json({ success: true, data: college });
            }
            catch (error) {
                return res.status(400).json({ success: false });
            }
        default:
            return res.status(400).json({ success: false });

    }
     */
}


