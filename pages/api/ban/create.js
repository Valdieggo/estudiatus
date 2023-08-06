import { connectToDatabase } from "../../../utils/db";
import Ban from "../../../models/Ban";
import User from "../../../models/User";
import Report from "../../../models/Report";
import mongoose from "mongoose";
import mail from "../../../utils/mail";

export default async function handler(req, res) {
    const { method } = req;
    const {user,type,time,status,report } = req.body;
    connectToDatabase();

    switch (method) {
        case "POST":
            const session = await mongoose.startSession();

            try {
                session.startTransaction();
                // Crea el nuevo registro de ban y lo guarda en la base de datos
                const newBan = new Ban({ user, type, time, status, report });
                await newBan.save();
                // Actualiza el usuario en el campo de isBanned
                const bannedUser = await User.findByIdAndUpdate(user, { isBanned: true }, { session });
                // Actualiza el reporte en el campo de estatus a "solved"
                const ReportUpdate = await Report.findByIdAndUpdate(report, { status: 'solved' }, { session });
                await session.commitTransaction();
                session.endSession();
                // Si todo va bien, se devuelve el nuevo ban creado
                sendMail( bannedUser.email, bannedUser.username, "Sancion", `
                    <p>Estimado ${bannedUser.username},</p>
                    <p>Haz sido baneado lo lamentamos</p>
                `);
                
                return res.status(201).json({ success: true, data: ReportUpdate });
                
            }catch (error) {
                await session.abortTransaction();
                session.endSession();
                throw error;
            }

        default:
            res.status(400).json({ success: false });
        break;
    }
};