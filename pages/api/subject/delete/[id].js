import { connectToDatabase } from "../../../../utils/db";
import Subject from "../../../../models/Subject";
import Career from "../../../../models/Career";
import Post from "../../../../models/Post";
import File from "../../../../models/File";
import axios from "axios";

export default async function handler(req, res) {
    const { method } = req;
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ success: false, message: "No ID provideed" });
    }

    await connectToDatabase();

    switch (method) {
        case "DELETE":
            try {
                const reqSubject = await Subject.findById(id);
                if(reqSubject.img){
                    await File.findByIdAndDelete(reqSubject.img);
                }
                //elimina todos los post relacionados al subject
                if(reqSubject.posts.length > 0){
                    Promise.all(reqSubject.posts.map(async (post) => {
                        await axios.delete(`${process.env.NEXT_PUBLIC_URL}:${process.env.PORT}/api/post/delete/${post._id}`);
                    }));
                }
                const subject = await Subject.findByIdAndRemove(id);
                await Career.findByIdAndUpdate(subject.career, {
                    $pull: { subjects: subject._id }
                });
                return res.status(200).json({ success: true, data: subject });
            }
            catch (error) {
                return res.status(400).json({ success: false, message: error });
            }
        default:
            return res.status(400).json({ success: false });
    }
}
