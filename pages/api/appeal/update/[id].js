import { connectToDatabase } from "../../../../utils/db";
import Appeal from "../../../../models/Appeal";
import User from "../../../../models/User";
import Report from "../../../../models/Report"
import sendMail from "../../../../utils/mail";


export default async function updateAppeal(req, res) {
    await connectToDatabase();
    const {id}= req.query;
            try {
                const appeal= await Appeal.findByIdAndUpdate(id,req.body,{new: true}).populate("appealer","username , email").populate("ban","type ,user, report");
                const report = await Report.findById(appeal.ban.report)
                const reportUInfo = await User.findById(report.reportUser)
                if (appeal) {
                    if(appeal.status=='Rechazada'){
                        
                        sendMail(appeal.appealer.email,appeal.appealer.username,"Informacion de su apelacion",
                        `<p>Estimado ${appeal.appealer.username}</p>
                        <p>Su apelación ha sido Rechazada, lo sentimos pero aun no puede ingresar al sitio.</p>
                        <p>Saludos, Team Estudiatus</p>
                        `
                        );
                        sendMail(reportUInfo.email,reportUInfo.username,"Informacion sobre su reporte",
                        `<p>Estimado ${reportUInfo.username}</p>
                        <p>El reporte que haz realizado a tenido concecuencias , gracias por la retroalimentacion.</p>
                        <p>Saludos, Team Estudiatus</p>
                        `
                        );
                    }else if(appeal.status=='Aceptada'){
                        sendMail(appeal.appealer.email,appeal.appealer.username,"Informacion de su apelacion",
                        `<p>Estimado ${appeal.appealer.username}</p>
                        <p>Su apelación ha sido Aceptada y puede ingresar al sitio nuevamente.</p>
                        <p>Saludos, Team Estudiatus</p>
                        `)
                }
                    return res.status(200).json({ message: "Appeal updated", appeal });
                }else {
                    return res.status(500).json({ message: "Appeal not updated" });
                }

            } catch (error) {
                return res.status(500).json({ message: "Error al actualizar la apelacion" + error});
        }
};