import { connectToDatabase } from "../../../utils/db";
import Ban from "../../../models/Ban";

export default async function handler(req,res){
    connectToDatabase();
    const{method}=req;
    switch(method){
        case "GET":

            try {
                const ban = await Ban.find({}).populate("user", "username , email").populate("report");
                if (ban) {
                    return res.status(200).json({ ban });
                    // si ban es igual a 0 entonces no hay bans
                }else if(ban == 0){
                    return res.status(200).json({ message: "No hay bans" });
                }else {
                    return res.status(500).json({ message: "Error al obtener los bans" });
                }
            } catch (error) {
                return res.status(500).json({ message: "Error al obtener los bans" + error});
            }
        default:
            res.status(400).json({ success: false });
        break;
    }

};