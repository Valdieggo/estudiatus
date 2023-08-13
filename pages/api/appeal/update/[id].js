import { connectToDatabase } from "../../../../utils/db";
import Appeal from "../../../../models/Appeal";
import User from "../../../../models/User"
import sendMail from "../../../../utils/mail";


export default async function updateAppeal(req, res) {
    await connectToDatabase();
    const {id}= req.query;
            try {
                const appeal= await Appeal.findByIdAndUpdate(id,req.body,{new: true}).populate("appealer","username , email").populate("ban","type ,user");
                console.log(appeal.status, appeal.appealer.email, appeal.appealer.username)
                if(appeal.status=='Rechazada'){
                        
                        sendMail(appeal.appealer.email, appeal.appealer.username, "Informacion de su apelacion",
                        `<p>Estimado ${appeal.appealer.username}</p>
                        <p>Su apelación ha sido Rechazada, lo sentimos pero aun no puede ingresar al sitio.</p>
                        <p>Saludos, Team Estudiatus</p>
                        `
                        )
                    }else if(appeal.status=='Aceptada'){
                        sendMail(appeal.appealer.email, appeal.appealer.username, "Informacion de su apelacion",
                        `<p>Estimado ${appeal.appealer.username}</p>
                        <p>Su apelación ha sido Aceptada y puede ingresar al sitio nuevamente.</p>
                        <p>Saludos, Team Estudiatus</p>
                        `
                        )
                        if (appeal) {
                            return res.status(200).json({ message: "Appeal updated", appeal });
                            }
                
                }
                else {
                    return res.status(500).json({ message: "Appeal not updated" });
                }

            } catch (error) {
                return res.status(500).json({ message: "Error al actualizar la apelacion" + error});
        }
};