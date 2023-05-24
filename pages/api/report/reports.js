// create reports 
import { connectToDatabase } from "../../../utils/db";
import Report from "../../../models/Report";
import User from "../../../models/User";



export default async function handler(req, res) {
    await connectToDatabase();
    const {reportUserId ,reportedUserId, reason, description, id} = req.body;
    switch (req.method) {
        case "POST":
            // Se crea el reporte OK
            
            const newReport = new Report({ reportUser: reportUserId, reportedUser:reportedUserId, reason, description });
            await newReport.save();
            if (newReport) {
                return res.status(201).json({ message: "Report created" });
            }
            else {
                return res.status(500).json({ message: "Report not created" });
            }
        case "GET":
            //Se lisstna los reportes OK
            const reports = await Report.find({}).populate("reportUser").populate("reportedUser").populate("post");
            if (reports) {
                return res.status(200).json({ reports });
                // si report es igual a 0 entonces no hay reportes
            }else if(reports == 0){
                return res.status(200).json({ message: "No hay reportes" });
            }else {
                return res.status(500).json({ message: "Error al obtener los reportes" });
            }
        case "PUT":
            // se actualiza el reporte segun lo que se le pase en el body OK
            
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
        case "DELETE":
            // se elimina el reporte segun lo que se le pase en el body
            const deleteReport = await Report.findByIdAndDelete(id);
            if (deleteReport) {
                return res.status(200).json({ message: "Report deleted" });
            }
            else {
                return res.status(500).json({ message: "Report not deleted" });
            }
        default:
            res.status(400).json({ success: false});
            break;
    }

};




