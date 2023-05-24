// create reports 
import { connectToDatabase } from "../../../../utils/db";

import Report, { findByIdAndDelete } from "../../../../models/Report";

export default async function handler(req, res) {
    const { reportUserId , reportedUserId, reason, description, postId } = req.body;
    await connectToDatabase();
    switch (req.method) {
        case "POST":
            const newReport = new Report({ reportUserId, reportedUserId, reason, description, postId });
            await newReport.save();
            if (newReport) {
                return res.status(201).json({ message: "Report created" });
            }
            else {
                return res.status(500).json({ message: "Report not created" });
            }
        case "GET":
            const reports = await Report.find({}).populate("reportUserId").populate("reportedUserId").populate("postId");
            if (reports) {
                return res.status(200).json({ reports });
                // si report es igual a 0 entonces no hay reportes
            }else if(reports == 0){
                return res.status(200).json({ message: "No hay reportes" });
            }else {
                return res.status(500).json({ message: "Error al obtener los reportes" });
            }
        case "PUT":
            // se actualiza el reporte segun lo que se le pase en el body
            const updateReport= await findByIdAndUpdate(req.body.id, req.body, { new: true });
            if (updateReport) {
                return res.status(200).json({ message: "Report updated" });
            }
            else {
                return res.status(500).json({ message: "Report not updated" });
            }
        case "DELETE":
            // se elimina el reporte segun lo que se le pase en el body
            const deletRepor=await findByIdAndDelete(req.body.id);
            if (deletRepor) {
                return res.status(200).json({ message: "Report deleted" });
            }
            else if(deletRepor == 0){
                return res.status(200).json({ message: "El reporte no existe" });
            }else {
                return res.status(500).json({ message: "Report not deleted" });
            }
        default:
            res.status(400).json({ success: false });
            break;
    }

};




