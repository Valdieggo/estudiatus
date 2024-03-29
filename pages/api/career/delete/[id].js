import { connectToDatabase } from "../../../../utils/db";
import Career from "../../../../models/Career";
import College from "../../../../models/College";
import Subject from "../../../../models/Subject";
import File from "../../../../models/File";
import axios from "axios";

export default async function handler(req, res) {
    const { method } = req;
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ success: false, message: "No id provideed" });
    }

    await connectToDatabase();
    // falta eliminarlo de college
    switch (method) {
        case "DELETE":
            try {
                const reqCareer = await Career.findById(id);
                console.log(id)
                if (reqCareer.img) {
                    await File.findByIdAndDelete(reqCareer.img);
                }

                if (reqCareer.subjects.length > 0) {
                    Promise.all(reqCareer.subjects.map(async (subject) => {
                        await axios.delete(`http://localhost:${process.env.PORT}/api/subject/delete/${subject._id}`);
                    }));
                }

                const career = await Career.findByIdAndRemove(id);
                // lo elimina de college
                await College.findByIdAndUpdate(career.college, {
                    $pull: { careers: career._id }
                });

                return res.status(200).json({ success: true, data: career });
            }
            catch (error) {
                return res.status(400).json({ success: false, message: error });
            }
        default:
            return res.status(400).json({ success: false });
    }
}