import { connectToDatabase } from "../../../utils/db";
import Report from "../../../models/Report";



export default async function handler(req,res){
    connectToDatabase();
    const {reportUserId ,reportedUserId, reason, description} = req.body;
    const { method } = req;

    switch (method) {
        case "POST":
            try {
                const newReport = new Report({ reportUser: reportUserId, reportedUser:reportedUserId, reason, description });
                await newReport.save();
                if (newReport) {
                    return res.status(201).json({ message: "Report created" });
                }
                else {
                    return res.status(500).json({ message: "Report not created" });
                }
            } catch (error) {
                return res.status(500).json({ message: "Error al crear el reporte" + error});
            }
        default:
            res.status(400).json({ success: false });
        break;
    }
};