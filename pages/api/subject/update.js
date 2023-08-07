import { connectToDatabase } from "../../../utils/db";
import Subject from "../../../models/Subject";

export default async function handler(req, res) {
    const { method } = req;
    const { id, subjectName, description, career, img } = req.body;

    if (!id) {
        return res.status(400).json({ success: false, message: "No ID provideed" });
    }

    connectToDatabase();

    //comprueba si ya existe otro con el mismo nombre y distinta id
    console.log(subjectName, id, career)
    if (await Subject.findOne({ subjectName, _id: { $ne: id } })) {
        return res.status(409).json({ success: false, message: "Subject already exists" });
    }

    if (subjectName) {
        if (subjectName.length > 100) {
            return res.status(400).json({ success: false, message: "Subject name cannot be more than 100 characters" });
        } else if (subjectName.length < 1) {
            return res.status(400).json({ success: false, message: "Subject name cannot be less than 1 character" });
        }
    }

    if(description){
        if (description.length > 300) {
            return res.status(400).json({ success: false, message: "Subject description cannot be more than 300 characters" });
        } else if (description.length < 1) {
            return res.status(400).json({ success: false, message: "Subject description cannot be less than 1 characters" });
        }
    }


    switch (method) {
        case "PUT":
            try {
                const query = await Subject.findByIdAndUpdate(id, {
                    subjectName,
                    description,
                    career,
                    img
                });

                const subject = await query.populate({
                    path: "career",
                    model: "Career",
                    select: "careerName"
                });
                console.log(subject)
                return res.status(200).json({ success: true, data: subject });
            }
            catch (error) {
                console.log(error)
                return res.status(400).json({ success: false, message: error });
            }
        default:
            return res.status(400).json({ success: false });
    }
}