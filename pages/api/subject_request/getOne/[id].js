import { connectToDatabase } from "../../../../utils/db";
import SubjectRequest from "../../../../models/SubjectRequest";
import Career from "../../../../models/Career";
import College from "../../../../models/College";

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
                subjectRequest
                    ? await SubjectRequest.findById(id)
                          .then(() => {
                              return res.status(200).json({
                                  success: true,
                                  data: subjectRequest,
                              });
                          })
                          .catch(() => {
                              return res.status(400).json({
                                  success: false,
                                  message: "Error al procesar la solicitud",
                              });
                          })
                    : res.status(400).json({
                          success: false,
                          message: "Solicitud no encontrada",
                      });
                return res
                    .status(200)
                    .json({ success: true, data: subjectRequest });
            } catch {
                return res.status(400).json({
                    success: false,
                    message: "Error al procesar la solicitud",
                });
            }
    }
}
