import { connectToDatabase } from "../../../utils/db";
import Career from "../../../models/Career";
import College from "../../../models/College";

export default async function handler(req, res) {
    const { method } = req;
    const { careerName, college, description } = req.body;

    if (!careerName || !college || !description) {
        return res.status(400).json({ success: false, message: "Empty fields" });
    }

    await connectToDatabase();

    //consulta todas las carreras que pertenecen a college y verifica si tiene el mismo nombre
    const careers = await Career.find({ college: college });
    for (let i = 0; i < careers.length; i++) {
        if (careers[i].careerName == careerName) {
            return res.status(409).json({ success: false, message: "Career already exists" });
        }
    }
    // verifica si existe college
    if(!await College.findById(college)){
        return res.status(409).json({ success: false, message: "College not exists" });
    }

    switch (method) {
        case "POST":
            try {
                const career = await Career.create({
                    careerName,
                    description,
                    college
                });
                
                await College.findByIdAndUpdate(college, {
                    $push: { careers: career._id }
                });

                return res.status(200).json({ success: true, data: career });
            } catch (error) {
                return res.status(400).json({ success: false, message: error });
            }
        default:
            return res.status(400).json({ success: false });
    }

}


