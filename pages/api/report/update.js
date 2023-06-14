import { connectToDatabase } from "../../../utils/db";
import Report from "../../../models/Report";
import User from "../../../models/User";

export default async function updateReport(req,res){
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