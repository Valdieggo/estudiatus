import { connectToDatabase } from "../../../../utils/db";
import Ban from "../../../../models/Ban";
import User from "../../../../models/User";
import Report from "../../../../models/Report";


// obtener un ban por id
export default async function handler(req, res) {
    try {
        connectToDatabase();
        const { method } = req;
        const { idBan } = req.query;
        switch (method) {
            case "GET":
                const ban = await Ban.findById(idBan).populate("user" , "-password").populate("report", "-reportUser");
                if (ban) {
                    return res.status(200).json({ ban });
                }
                else {
                    return res.status(500).json({ message: "Error al obetener el ban" });
                }

            default:
                res.status(400).json({ success: false });
                break;
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Error al obtener el ban" + error });
    }

};
