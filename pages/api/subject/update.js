import { connectToDatabase } from "../../../utils/db";
import Subject from "../../../models/Subject";

export default async function handler(req, res) {
    const { method } = req;
    const { id, subjectName, description } = req.body;

    if (!id) {
        return res.status(400).json({ success: false, message: "No ID provideed" });
    }

    connectToDatabase();

    //comprueba si ya existe otro con el mismo nombre y distinta id
    console.log(subjectName, id)
    if (await Subject.findOne({ subjectName, _id: { $ne: id } })) {
        return res.status(409).json({ success: false, message: "Subject already exists" });
    }

    if (subjectName) {
        if (subjectName.length > 100) {
            return res.status(400).json({ success: false, message: "Subject name cannot be more than 100 characters" });
        } else if (subjectName.length < 5) {
            return res.status(400).json({ success: false, message: "Subject name cannot be less than 5 characters" });
        }
    }

    if(description){
        if (description.length > 300) {
            return res.status(400).json({ success: false, message: "Subject description cannot be more than 300 characters" });
        } else if (description.length < 10) {
            return res.status(400).json({ success: false, message: "Subject description cannot be less than 10 characters" });
        }
    }


    switch (method) {
        case "PUT":
            try {
                console.log(subjectName, description)
                const query = await Subject.findByIdAndUpdate(id, {
                    subjectName,
                    description
                });
                return res.status(200).json({ success: true, message: query });
            }
            catch (error) {
                return res.status(400).json({ success: false, message: error });
            }
        default:
            return res.status(400).json({ success: false });
    }
}