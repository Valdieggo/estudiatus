import { connectToDatabase } from "../../../utils/db";
import SubjectRequest from "../../../models/SubjectRequest";
import College from "../../../models/College";
import Career from "../../../models/Career";

export default async function handler(req, res) {
    const { method } = req;
    const { subjectName, college, career, requestingUser, description } =
        req.body;
    if (!subjectName) {
        return res
            .status(400)
            .json({ success: false, message: "Nombre vacio" });
    }
    if (!description) {
        return res
            .status(400)
            .json({ success: false, message: "Descripcion vacia" });
    }

    await connectToDatabase();

    switch (method) {
        case "POST":
            try {
                const newSubjectRequest = new SubjectRequest({
                    subjectName,
                    college,
                    career,
                    requestingUser,
                    description,
                });
                await newSubjectRequest.save();
                if (newSubjectRequest) {
                    return res
                        .status(201)
                        .json({ message: "Solicitud enviada" });
                } else {
                    return res
                        .status(500)
                        .json({ message: "La solicitud no se pudo realizar" });
                }
            } catch (error) {
                return res.status(500).json({
                    message: "Error al crear el Subject Request" + error,
                });
            }
        default:
            res.status(400).json({ success: false });
            break;
    }
}
