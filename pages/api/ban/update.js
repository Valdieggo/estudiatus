import { connectToDatabase } from "../../../utils/db";
import Ban from "../../../models/Ban";


export default async function handler(req, res) {
    connectToDatabase();
    const { method } = req;
    const {user,type,time,status,report, id} = req.body;
    switch (method) {
        case "PUT":
            try {
                const updateBan= await Ban.findByIdAndUpdate(id, {
                    user,
                    type,
                    time,
                    status,
                    report},
                        { new: true });
                if (updateBan) {
                    return res.status(200).json({ message: "Ban updated" });
                }
                else {
                    return res.status(500).json({ message: "Ban not updated" });
                }
            } catch (error) {
                return res.status(500).json({ message: "Error al actualizar el ban" + error});
            }
        default:
            res.status(400).json({ success: false });
        break;
    }

};