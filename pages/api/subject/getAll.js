import { connectToDatabase } from "../../../utils/db";
import Subject from "../../../models/Subject";
import File from "../../../models/File";
import Career from "../../../models/Career";

export default async function handler(req, res) {
    const { method } = req;
    await connectToDatabase();

    switch (method) {
        case "GET":
            try {
                const subjects = await Subject.find({})
                    .populate(
                       [ {
                            path: "img",
                            model: "File",
                        },
                        {
                            path: "career",
                            model: "Career",
                            select: "careerName"
                        }]
                    )
                return res.status(200).json({ success: true, data: subjects });
            } catch (error) {
                return res.status(400).json({ success: false, message: error });
            }
        default:
            return res.status(400).json({ success: false });
    }
}


