import { connectToDatabase } from "../../../../utils/db";
import Report from "../../../../models/Report";

import User from "../../../../models/User";

export default async function handler(req, res) {
    // se ibtiene un reporte por id
    try {
        connectToDatabase();
        const { method } = req;
        const { idReport } = req.query;

        switch (method) {
            case "GET":
                // se busaca el reporte por id y se hace un populate de los campos que son de tipo ObjectId, para obtener los datos de los usuarios, excepto las contraseñas
                const report = await Report.findById(idReport).populate("reportUser","username , email").populate("reportedUser","username , email").populate("post");
                if (report) {
                    return res.status(200).json({ report });
                }
                else {
                    return res.status(500).json({ message: "Error al obetener el reporte" });
                }

            default:
                res.status(400).json({ success: false });
                break;
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Error al obtener el reporte" + error });
    }

};
