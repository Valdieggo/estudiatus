import { connectToDatabase } from "../../../../utils/db";
import Appeal from "../../../../models/Appeal";


export default async function deleteOne(req, res) {
   await connectToDatabase();
    const { id } = req.query;
        try {
                if (await Appeal.findByIdAndDelete(id)) {
                    return res.status(204).json({ message: "Appeal deleted" });
                }
                else {
                    console.log('error');
                    return res.status(500).json({ message: "Appeal could not be deleted" });
                    
                }
            } catch (error) {
                return res.status(500).json({ message: "Error while trying to delete appeal. " + error });
                }
};