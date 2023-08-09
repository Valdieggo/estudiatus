import { connectToDatabase } from "../../../utils/db";
import Ban from "../../../models/Ban";
import User from "../../../models/User";
import Report from "../../../models/Report";
import mongoose from "mongoose";
import sendMail from "../../../utils/mail";


export default async function handler(req, res) {
    const { method } = req;
    const {user,type,status,report } = req.body;
    let { time } = req.body;
    connectToDatabase();

    switch (method) {
        case "POST":
            const session = await mongoose.startSession();
            if (type === "permanentemente") {
                time = new Date(3000,1,1);
            }
            try {
                session.startTransaction();
                // Crea el nuevo registro de ban y lo guarda en la base de datos
                const newBan = new Ban({ user, type, time, status, report });
                await newBan.save();
                // Actualiza el usuario en el campo de isBanned
                const bannedUser = await User.findByIdAndUpdate(user, { isBanned: true }, { session });
                console.log(bannedUser);
                // Actualiza el reporte en el campo de estatus a "solved"
                const ReportUpdate = await Report.findByIdAndUpdate(report, { status: 'solved' }, { session });
                sendMail( bannedUser.email, bannedUser.username, "Sancion", `
                    <p>Estimado ${bannedUser.username},</p>
                    <p>Haz sido baneado lo lamentamos</p>
                    <p>La ducion del ban es hasta ${time}</p>
                `);
                sendMail( ReportUpdate.reportUser.email, ReportUpdate.reportUser.username, "Reporte", `
                    <p>Estimado ${ReportUpdate.reportUser.username},</p>
                    <p>El reporte que realizaste ha sido resuelto</p>
                `);
                await session.commitTransaction();
                session.endSession();
                // Si todo va bien, se devuelve el nuevo ban creado
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