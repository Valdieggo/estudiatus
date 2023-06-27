import { connectToDatabase } from "../../../../utils/db";
import Appeal from "../../../../models/Appeal";
import Ban from "../../../../models/Ban";
import User from "../../../../models/User";

export default async function handler(req, res) {
   await connectToDatabase();
    const { method } = req;
    const { goid } = req.query;
    const appeal = await Appeal.findById(goid).populate("appealer","-password -favs").populate("ban","-user");

    if(method=="GET"){
        try {
                if (appeal) {
                    return res.status(200).json({ appeal });
                }
                else {
                    return res.status(500).json({ message: "Appeal not found" });
                }
            } catch (error) {
                return res.status(500).json({ message: "Error while trying to fetch appeal. " + error });
                }
    }else{
    res.status(400).json({ success: false, message:"Wrong request method"  });
    }

};