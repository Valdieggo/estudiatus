// pages/api/subs/getSubsByUser.js
import { connectToDatabase } from "../../../utils/db";
import Career from "../../../models/Career";
import Subject from "../../../models/Subject";

export default async function handler(req, res) {
    const { method } = req;

    await connectToDatabase();

    switch (method) {
        case "GET":
            try {
                console.log("acces");

                const { id } = req.query;

                if (!id) {
                    return res.status(400).json({ success: false, message: "User id is required." });
                }

                const userSubscribedCareers = await Career.find({ subscribers: { $in: [id] } });
                const userSubscribedSubjects = await Subject.find({ subscribers: { $in: [id] } });

                return res.status(200).json({ 
                    success: true, 
                    data: {
                        careers: userSubscribedCareers,
                        subjects: userSubscribedSubjects
                    }
                });

            } catch (error) {
                return res.status(500).json({ success: false, message: "Internal Server Error.", error });
            }
        default:
            return res.status(405).json({ success: false, message: "Method not allowed." });
    }
}
