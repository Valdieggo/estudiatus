import { connectToDatabase } from "../../../../utils/db";
import Ban from "../../../../models/Ban";


export default async function handler(req, res) {
   try {
        connectToDatabase();
        const { method } = req;
        const { idBan } = req.query;
        switch (method) {
            case "DELETE":
                const report = await Ban.findByIdAndDelete(idBan);
                if (report) {
                    return res.status(200).json({ message: "Ban deleted" });
                }
                else {
                    return res.status(500).json({ message: "Ban not deleted" });
                }

            default:
                res.status(400).json({ success: false });
                break;
        }
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar el reporte" + error });
    }

};