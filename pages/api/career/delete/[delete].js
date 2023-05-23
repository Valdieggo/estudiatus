import { connectToDatabase } from "../../../../utils/db";
import Career from "../../../../models/Career";

export default async function handler(req, res) {
    const { method } = req;
    const  id  = req.query.delete;

    if (!id) {
        return res.status(400).json({ success: false, message: "No id provideed" });
    }

    await connectToDatabase();

    switch (method) {
        case "DELETE":
            try {
                const career = await Career.findByIdAndRemove(id);
                return res.status(200).json({ success: true, data: career });
            }
            catch (error) {
                return res.status(400).json({ success: false, message: error });
            }
        default:
            return res.status(400).json({ success: false });
    }
}


