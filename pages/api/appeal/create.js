import { connectToDatabase } from "../../../utils/db";
import Appeal from "../../../models/Appeal";


export default async function handler(req, res) {
    const { method } = req;
    const { name, description, ban, appealer, status} = req.body;
    connectToDatabase();

    switch (method) {
        case "POST":
            try {
                const newAppeal = new Appeal({ name, description, ban, appealer, status });
                await newAppeal.save();
                if (newAppeal) {
                    // retorna la apelacion creada
                    return res.status(201).json({ message: "Appeal created", appeal: newAppeal} );
                }
                else {
                    return res.status(500).json({ message: "Appeal not created" });
                }
        
            } catch (error) {
                return res.status(500).json({ message: "Error al crear la apelacion" + error});
            }
        default:
            res.status(400).json({ success: false });
        break;
    }
};