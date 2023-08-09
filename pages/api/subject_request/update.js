import { connectToDatabase } from "../../../utils/db";
import SubjectRequest from "../../../models/SubjectRequest";

export default async function handler(req, res) {
    const { method } = req;
    const { id, status } = req.body;

    if (!id || !status) {
        return res
            .status(400)
            .json({ success: false, message: "ID o estado no ingresado" });
    }

    await connectToDatabase();

    switch (method) {
        case "PUT":
            try {
                if (status !== "Aceptada" && status !== "Rechazada") {
                    return res.status(400).json({
                        success: false,
                        message: "Estado no válido",
                    });
                }

                const updatedSubjectRequest =
                    await SubjectRequest.findByIdAndUpdate(
                        id,
                        { status },
                        { new: true }
                    );

                if (!updatedSubjectRequest) {
                    return res.status(400).json({ success: false });
                }

                return res.status(200).json({
                    success: true,
                    data: updatedSubjectRequest,
                });
            } catch (error) {
                console.error("Error updating subject request:", error);
                return res.status(400).json({
                    success: false,
                    message: "Error al actualizar la solicitud",
                });
            }

        default:
            return res.status(400).json({ success: false });
    }
}
