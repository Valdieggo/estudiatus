import { connectToDatabase } from "../../../../utils/db";
import Appeal from "../../../../models/Appeal";


export default async function updateAppeal(req, res) {
    await connectToDatabase();
    const {id}= req.query;
            try {
                const appeal= await Appeal.findByIdAndUpdate(id,req.body,{new: true}).populate("appealer","username , email").populate("ban","type ,user");
                if (appeal) {
                    return res.status(200).json({ message: "Appeal updated", appeal });
                }
                else {
                    return res.status(500).json({ message: "Appeal not updated" });
                }
            } catch (error) {
                return res.status(500).json({ message: "Error al actualizar la apelacion" + error});
        }
};