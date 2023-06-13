import { connectToDatabase } from "../utils/db";
import Report from "../models/Report";
import User from "../models/User";

export async function createReport(req,res){
     connectToDatabase();
    const {reportUserId ,reportedUserId, reason, description} = req.body;
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
};
export async function getReports(req,res){
// se listan todos los reportes
    connectToDatabase();
    try {
        const reports = await Report.find({}).populate("reportUser").populate("reportedUser").populate("post");
        if (reports) {
            return res.status(200).json({ reports });
            // si report es igual a 0 entonces no hay reportes
        }else if(reports == 0){
            return res.status(200).json({ message: "No hay reportes" });
        }else {
            return res.status(500).json({ message: "Error al obtener los reportes" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Error al obtener los reportes" + error});
    }
};
export async function updateReport(req,res){
   connectToDatabase();
    const {reportUserId ,reportedUserId, reason, description, id} = req.body;
    try {
        const updateReport= await Report.findByIdAndUpdate(id, {
            reportUser:reportUserId,
            reportedUser:reportedUserId,
            reason,
            description},
              { new: true });
        if (updateReport) {
            return res.status(200).json({ message: "Report updated" });
        }
        else {
            return res.status(500).json({ message: "Report not updated" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar el reporte" + error});
    }
};