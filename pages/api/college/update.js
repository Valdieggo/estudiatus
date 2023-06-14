// deberia ser un solo archivo para actualizar todo
import { connectToDatabase } from "../../../utils/db";
import College from "../../../models/College";

export default async function handler(req, res) {
    const { method } = req;
    const { id, collegeName, img } = req.body;

    if (!id) {
        return res.status(400).json({ success: false, message: "No ID provideed" });
    }

    connectToDatabase();

    if (await College.findOne({ collegeName, _id: {$ne: id} })) {
        return res.status(409).json({ sucess: false, message: "College already exists" });
    }

    switch (method) {
        case "PUT":
            try {
                const query = await College.findByIdAndUpdate(id, {
                    collegeName,
                    img
                });

                return res.status(200).json({ success: true, message: query});
            }
            catch (error) {
                return res.status(400).json({ success: false, message: error });
            }
        default:
            return res.status(400).json({ success: false });

    }
}


