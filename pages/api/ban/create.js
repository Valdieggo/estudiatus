import { connectToDatabase } from "../../../utils/db";
import Ban from "../../../models/Ban";


export default async function handler(req, res) {
    const { method } = req;
    const {user,type,time,status,report } = req.body;
    connectToDatabase();

    switch (method) {
        case "POST":
            try {
                const newBan = new Ban({ user,type,time,status,report });
                await newBan.save();
                if (newBan) {
                    // se retorna el ban creado
                    return res.status(201).json({ message: "Ban created", ban: newBan} );
                }
                else {
                    return res.status(500).json({ message: "Ban not created" });
                }
        
            } catch (error) {
                return res.status(500).json({ message: "Error al crear el ban" + error});
            }
        default:
            res.status(400).json({ success: false });
        break;
    }
};