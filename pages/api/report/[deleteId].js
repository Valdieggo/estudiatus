import { connectToDatabase } from "../../../utils/db";
import Report from "../../../models/Report";


export default async function DELETE(req, res) {
   try {
   connectToDatabase();
    const { daleteId } = req.query;
    const report = await Report.findByIdAndDelete(daleteId);
    if (report) {
            
            return res.status(200).json({ message: "Report deleted" });
        }
        else {
            return res.status(500).json({ message: "Report not deleted" });
        }


   } catch (error) {

    return res.status(500).json({ message: "Error al eliminar el reporte" + error});
    }

};