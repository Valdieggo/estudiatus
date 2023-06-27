import { connectToDatabase } from "../../../../utils/db";
import Appeal from "../../../../models/Appeal";


export default async function deleteOne(req, res) {
   await connectToDatabase();
    const { method } = req;
    const { id } = req.query;

    if(method=="DELETE"){
        try {
                if (await Appeal.findByIdAndDelete(id)) {
                    return res.status(204).json({ message: "Appeal deleted" });
                }
                else {
                    return res.status(500).json({ message: "Appeal could not be deleted" });
                }
            } catch (error) {
                return res.status(500).json({ message: "Error while trying to delete appeal. " + error });
                }
    }else{
    res.status(400).json({ success: false, message:"Wrong request method"  });
    }

};