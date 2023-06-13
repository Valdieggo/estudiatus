import { connectToDatabase } from "../../../utils/db";
import Ban from "../../../models/Ban";


export default async function handler(req, res) {
    try {
        connectToDatabase();
        const { method } = req;
        const { deleteId } = req.query;
        console.log("deleteId", deleteId);
        switch (method) {
            case "DELETE":
                const ban = await Ban.findByIdAndDelete(deleteId);
                if (ban) {
                    return res.status(200).json({ message: "Ban deleted" });
                }
                else {
                    return res.status(500).json({ message: "Ban not deleted" });
                }

            default:
                res.status(400).json({ success: false });
                break;
        }
    }catch (error) {
        return res.status(500).json({ message: "Error al eliminar el ban"});
    }
};