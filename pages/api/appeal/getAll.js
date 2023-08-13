import { connectToDatabase } from "../../../utils/db";
import Appeal from "../../../models/Appeal";
import User from "../../../models/Appeal";
import Ban from "../../../models/Ban";

export default async function getAppeals(req,res){
    await connectToDatabase();
    const { method } = req;
    if(method=="GET"){
        try {
                const appeals = await Appeal.find({}).populate("appealer","username , email").populate("ban","type , user, status, report").populate([{path: "ban",populate:"report", strictPopulate:false}])
                if (appeals) {
                    return res.status(200).json({ appeals });
                }else if(appeals==0){
                    return res.status(500).json({ message: "No appeals found" });
                }
            } catch (error) {
                return res.status(500).json({ message: "Error while trying to fetch appeal. " + error });
                }
    }else{
    res.status(400).json({ success: false, message:"Wrong request method"  });
    }
};