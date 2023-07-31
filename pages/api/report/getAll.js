import { connectToDatabase } from "../../../utils/db";
import Report from "../../../models/Report";
import User from "../../../models/User";
import Post from "../../../models/Post";

export default async function getReports(req,res){
    // se listan todos los reportes
        connectToDatabase();
    try {
        const reports = await Report.find({}).populate("reportUser","username , email").populate("reportedUser","username , email").populate("post");

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