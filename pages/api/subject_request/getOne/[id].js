import { connectToDatabase } from "../../../../utils/db";
import SubjectRequest from "../../../../models/SubjectRequest";
import College from "../../../../models/College";
import Career from "../../../../models/Career";

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
                const college = await College.findById(subjectRequest.college);
                const career = await Career.findById(subjectRequest.career);

                // Desestructurar college y career para obtener solo los valores
                const { _id: collegeId, collegeName } = college;
                const { _id: careerId, careerName } = career;

                // Incluir los atributos directamente en el objeto subjectRequestWithNames
                const subjectRequestWithNames = {
                    ...subjectRequest._doc,
                    college: collegeName,
                    collegeId,
                    career: careerName,
                    careerId,
                };

                return res.status(200).json({
                    success: true,
                    data: subjectRequestWithNames,
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
