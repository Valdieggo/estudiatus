import { connectToDatabase } from "../../../utils/db";
import Subject, { findById } from "../../../models/Subject";
import Career from "../../../models/Career";

export default async function handler(req, res) {
    const { method } = req;
    const { subjectName, career, description, img } = req.body;
    if (!subjectName) {
        return res.status(400).json({ success: false, message: "Nombre vacío" });
    }
    
    if (!description) {
        return res.status(400).json({ success: false, message: "Sin descripción" });
    }
    if (!career) {
        return res.status(400).json({ success: false, message: "Carrera vacía" });
    }

    await connectToDatabase();

    // verifica si existe career
    if (!await Career.findById(career)) {
        return res.status(409).json({ success: false, message: "La carrera no existe" });
    }


    //consulta todas las carreras que pertenecen a career y verifica si tiene el mismo nombre

    const subjects = await Subject.find({ career: career });

    for (let i = 0; i < subjects.length; i++) {
        if (subjects[i].subjectName == subjectName) {
            return res.status(409).json({ success: false, message: "Ya existe una asignatura con el mismo nombre en la misma carrera" });
        }
    }
    
    switch (method) {
        case "POST":
            try {
                const reqSubject = await Subject.create({
                    subjectName,
                    description,
                    career,
                    img
                })
                await Career.findByIdAndUpdate(career, {
                    $push: { subjects: reqSubject._id }
                });
                const subject = await Subject.findById(reqSubject._id).populate({
                    path: "career",
                    model: "Career",
                    select: "careerName"
                });

                return res.status(200).json({ success: true, data: subject });
            } catch (error) {
                return res.status(400).json({ success: false, message: error });
            }
        default:
            return res.status(400).json({ success: false });
    }

}


