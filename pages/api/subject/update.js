import { connectToDatabase } from "../../../utils/db";
import Subject from "../../../models/Subject";

export default async function handler(req, res) {
    const { method } = req;
    const { id, subjectName, description } = req.body;

    if (!id) {
        return res.status(400).json({ success: false, message: "No ID provideed" });
    }

    connectToDatabase();

    //comprueba si ya existe otro con el mismo nombre y distinta id
    if (await Subject.findOne({ subjectName, _id: { $ne: id } })) {
        return res.status(409).json({ success: false, message: "Subject already exists" });
    }

    switch (method) {
        case "PUT":
            try {
                const query = await Subject.findByIdAndUpdate(id, {
                    subjectName,
                    description,
                });
                return res.status(200).json({ success: true, message: query });
            }
            catch (error) {
                return res.status(400).json({ success: false, message: error });
            }
        default:
            return res.status(400).json({ success: false });
    }
}