import { connectToDatabase } from "../../../utils/db";
import Appeal from "../../../models/Appeal";


export default async function handler(req, res) {
    const { method } = req;
    const { name, description, ban, appealer} = req.body;
    connectToDatabase();

    if (method=="POST") {
            try {
                const newAppeal = new Appeal({ name, description, ban, appealer });
                await newAppeal.save()
                if (newAppeal) {
                    return res.status(201).json({ message: "Appeal created", appeal: newAppeal} );
                }
                else {
                    return res.status(500).json({ message: "Appeal not created" });
                }
        
            } catch (error) {
                return res.status(500).json({ message: "Error al crear la apelacion. " + error});
            }
    }else{ 
        res.status(400).json({ success: false, message:"Wrong request method"  });
    }
    
};