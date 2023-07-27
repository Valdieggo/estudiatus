import { connectToDatabase } from "../../../../utils/db";
import SubjectRequest from "../../../../models/SubjectRequest";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ success: false, message: "ID no ingresado" });
  }

  await connectToDatabase();

  switch (method) {
    case "DELETE":
      try {
        const subjectRequest = await SubjectRequest.findById(id);
        subjectRequest
          ? await SubjectRequest.findByIdAndDelete(id)
              .then(() => {
                return res
                  .status(200)
                  .json({ success: true, message: "Solicitud eliminada" });
              })
              .catch(() => {
                return res.status(400).json({
                  success: false,
                  message: "Error al eliminar la solicitud",
                });
              })
          : res
              .status(400)
              .json({ success: false, message: "Solicitud no encontrada" });
        return res.status(200).json({ success: true, data: id });
      } catch {
        return res
          .status(400)
          .json({ success: false, message: "Error al eliminar la solicitud" });
      }
  }
}
