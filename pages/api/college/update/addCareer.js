// deberia ser un solo archivo para actualizar todo
import { connectToDatabase } from "../../../../utils/db";
import College from "../../../../models/College";


export default async function handler(req, res) {
    const { method } = req;
    const { id, career } = req.body;

    if (!id || !career) {
        return res.status(400).json({ success: false, message: "Empty fields" });
    }

    await connectToDatabase();

    // agrega la carrera al arreglo
    switch (method) {
        case "PUT":
            try {

                //si college no posee la carrera la agrega
                if ((await College.findById(id)).careers.includes(career)) {
                    return res.status(200).json({ success: false, message: "Career already exists" });
                }

                await College.findByIdAndUpdate(id, {
                    $push: { careers: career }
                });
                return res.status(200).json({ success: true });

            }
            catch (error) {
                return res.status(400).json({ success: false, message: error });
            }
        default:
            return res.status(400).json({ success: false });
    }
}