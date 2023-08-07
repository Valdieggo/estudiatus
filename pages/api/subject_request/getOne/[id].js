import { connectToDatabase } from "../../../../utils/db";
import SubjectRequest from "../../../../models/SubjectRequest";

export default async function handler(req, res) {
    const { method } = req;
    const { id } = req.query;

    if (!id) {
        return res
            .status(400)
            .json({ success: false, message: "ID no ingresado" });
    }

    await connectToDatabase();

    switch (method) {
        case "GET":
            try {
                const subjectRequest = await SubjectRequest.findById(id);
                if (!subjectRequest) {
                    return res.status(400).json({
                        success: false,
                        message: "Solicitud no encontrada",
                    });
                }
                return res.status(200).json({
                    success: true,
                    data: subjectRequest,
                });
            } catch (error) {
                console.error("Error fetching subject request data:", error);
                return res.status(400).json({
                    success: false,
                    message: "Error al procesar la solicitud",
                });
            }

        default:
            return res.status(400).json({ success: false });
    }
}
