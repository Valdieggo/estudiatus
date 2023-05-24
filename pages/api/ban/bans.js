import Ban from "../../../models/Ban";
import User from "../../../models/User";
import Report from "../../../models/Report";
import { connectToDatabase } from "../../../utils/db";

export default async function handler(req, res) {
    const {user,type,time,status,report } = req.body;
    await connectToDatabase();
    switch (req.method) {
        case "POST":
            // Se crea el ban OK
            const newBan = new Ban({ user,type,time,status,report });
            await newBan.save();
            if (newBan) {
                return res.status(201).json({ message: "Ban created" });
            }
            else {
                return res.status(500).json({ message: "Ban not created" });
            }
        case "GET":
            //Se ontiene un ban por el campo de user
            const ban = await Ban.find({user}).populate("user").populate("report");
            if (ban) {
                return res.status(200).json({ ban });
                // si ban es igual a 0 entonces no hay bans
            }else if(ban == 0){
                return res.status(200).json({ message: "No hay bans" });
            }else {
                return res.status(500).json({ message: "Error al obtener los bans" });
            }
        case "PUT":
            // se actualiza el ban segun lo que se le pase en el body
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
        case "DELETE":
            // se elimina el ban segun lo que se le pase en el body
        
        default:
            res.status(400).json({ success: false});
            break;
    }


};