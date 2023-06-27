import { connectToDatabase } from "../../../utils/db";
import Appeal from "../../../models/Appeal";


export default async function updateAppeal(req, res) {
    await connectToDatabase();
    const { method } = req;
    const { name, description, ban, appealer, status,id} = req.body;
    if(method=="PUT"){
            try {
                const appeal= await Appeal.findByIdAndUpdate(id, {
                    name,
                    description,
                    ban,
                    status,
                    appealer}, {new: true}).populate("appealer","-password -favs").populate("ban","-user -time");
                if (appeal) {
                    return res.status(200).json({ message: "Appeal updated", appeal });
                }
                else {
                    return res.status(500).json({ message: "Appeal not updated" });
                }
            } catch (error) {
                return res.status(500).json({ message: "Error al actualizar la apelacion" + error});
        }
    }else{
        res.status(400).json({ success: false, message:"Wrong request method" });
    }

};