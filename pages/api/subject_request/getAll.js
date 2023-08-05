import { connectToDatabase } from "../../../utils/db";
import SubjectRequest from "../../../models/SubjectRequest";
import Career from "../../../models/Career";
import College from "../../../models/College";

export default async function handler(req, res) {
    const { method } = req;

    await connectToDatabase();

    switch (method) {
        case "GET":
            try {
                const subjectRequests = await SubjectRequest.find({})
                    .populate("college", "collegeName -_id")
                    .populate("career", "careerName -_id")
                    .select("-_id");

                const formattedSubjectRequests = subjectRequests.map(
                    (request) => ({
                        subjectName: request.subjectName,
                        collegeName: request.college?.collegeName,
                        careerName: request.career?.careerName,
                        requestingUser: request.requestingUser,
                        description: request.description,
                        status: request.status,
                        date: request.date,
                        __v: request.__v,
                    })
                );

                res.status(200).json({
                    success: true,
                    data: formattedSubjectRequests,
                });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
