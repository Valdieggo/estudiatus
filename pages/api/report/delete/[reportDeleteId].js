import { connectToDatabase } from "../../../../utils/db";
import Report from "../../../../models/Report";
import User from "../../../../models/User";

export default async function handler(req, res) {
   try {
   connectToDatabase();
    const { method } = req;
    const { reportDeleteId } = req.query;

    switch (method) {
        case "DELETE":
            const report = await Report.findByIdAndDelete(reportDeleteId).populate("user");
            if (report) {
                return res.status(200).json({ message: "Report deleted" });
            }
            else {
                return res.status(500).json({ message: "Report not deleted" });
            }

        default:
            res.status(400).json({ success: false });
            break;
    }
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar el reporte" + error });
    }

};