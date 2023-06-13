import { connectToDatabase } from "../../../../utils/db";
import Subject from "../../../../models/Subject";
import Career from "../../../../models/Career";

export default async function handler(req, res) {
    const { method } = req;
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ success: false, message: "No ID provideed" });
    }

    await connectToDatabase();

    switch (method) {
        case "DELETE":
            try {
                const subject = await Subject.findByIdAndRemove(id);
                await Career.findByIdAndUpdate(subject.career, {
                    $pull: { subjects: subject._id }
                });
                return res.status(200).json({ success: true, data: subject });
            }
            catch (error) {
                return res.status(400).json({ success: false, message: error });
            }
        default:
            return res.status(400).json({ success: false });
    }
}
