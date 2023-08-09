import { connectToDatabase } from "../../../../utils/db";
import College from "../../../../models/College";
import Career from "../../../../models/Career";
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
                const reqCollege = await College.findById(id);
                if(reqCollege.careers.length > 0){
                    //await Career.deleteMany({ _id: { $in: reqCollege.careers } });
                    Promise.all(reqCollege.careers.map(async (career) => {
                        await axios.delete(`http://localhost:${process.env.PORT}/api/career/delete/${career._id}`);
                    }));
                }
                if(reqCollege.img){
                    await File.findByIdAndDelete(reqCollege.img);
                }
                const resCollege = await College.findByIdAndDelete(id);

                return res.status(200).json({ success: true, data: resCollege });
            }
            catch (error) {
                return res.status(400).json({ success: false, message: error });
            }
        default:
            return res.status(400).json({ success: false });
    }
}


