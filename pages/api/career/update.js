import { connectToDatabase } from "../../../utils/db";
import Career from "../../../models/Career";

export default async function handler(req, res) {
    const { method } = req;
    const { id, careerName, description, img } = req.body;

    if (!id) {
        return res.status(400).json({ success: false, message: "No ID provideed" });
    }

    connectToDatabase();

    if (await Career.findOne({ careerName })) {
        return res.status(409).json({ sucess: false, message: "Career already exists" });
    }

    //agregar modificar la universidad es mas trabajo


    switch (method) {
        case "PUT":
            try {
                const query = await Career.findByIdAndUpdate(id, {
                    careerName,
                    description,
                    img
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


