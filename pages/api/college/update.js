import { connectToDatabase } from "../../../utils/db";
import College from "../../../models/College";

export default async function handler(req, res) {
    const { method } = req;
    const { id, collegeName, careers } = req.body;

    if (!id ) {
        return res.status(400).json({ success: false, message: "No ID provideed" });
    }

    connectToDatabase();

    if (await College.findOne({ collegeName })) {
        return res.status(409).json({ sucess: false, message: "College already exists" });
    }

    switch (method) {
        case "PUT":
            try {
                // reducir esto
                if(collegeName){
                    await College.findByIdAndUpdate(id, {
                        collegeName,
                    });
                }
                if(careers){
                    await College.findByIdAndUpdate(id, {
                        $push: { careers } // arreglar duplicados
                    });
                }
                
                return res.status(200).json({ success: true });
            }
            catch (error) {
                return res.status(400).json({ success: false, message: error });
            }
        default:
            return res.status(400).json({ success: false });

    }
}


