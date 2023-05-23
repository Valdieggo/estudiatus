import { connectToDatabase } from "../../../utils/db";
import Career from "../../../models/Career";
import updateCollege from "../college/update";

export default async function handler(req, res) {
    const { method } = req;
    const { careerName, college, description } = req.body;

    if (!careerName || !college || !description) {
        return res.status(400).json({ success: false, message: "Empty fields" });
    }

    await connectToDatabase();


    /* TODO

    switch (method) {
        case "POST":
            try {
                
                const career = await Career.create({
                    careerName,
                    description,
                    college
                });

        
                return res.status(200).json({ success: true, data: career });
            } catch (error) {
                return res.status(400).json({ success: false, message: error });
            }
        default:
            return res.status(400).json({ success: false });
    }
    */
}


