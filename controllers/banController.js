import Ban from "../models/Ban.js";
import User from "../models/User.js";
import Report from "../models/Report.js";
import { connectToDatabase } from "../utils/db.js";

//controller for bans
export async function createBan(req, res){
    connectToDatabase();
    const {user,type,time,status,report } = req.body;
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
};

export async function getOneBan(req, res){
    connectToDatabase();
    const {idBan} = req.body;
    console.log(idBan);
    try {
        const ban = await Ban.find({}).populate("user").populate("report");
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
};

export async function updateBan(req, res){
    connectToDatabase();
    const {user,type,time,status,report, id} = req.body;
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
};

export async function deleteBan(req, res){
    connectToDatabase();
    const {idBan} = req.body;
    try {
        const ban = await Ban.findByIdAndDelete(idBan);
        if (ban) {
            return res.status(200).json({ message: "Ban deleted" });
        }
        else {
            return res.status(500).json({ message: "Ban not deleted" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar el ban"});
    }
};