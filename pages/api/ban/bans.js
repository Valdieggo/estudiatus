import { createBan } from "../../../controllers/banController";
import { getOneBan } from "../../../controllers/banController";
import { updateBan } from "../../../controllers/banController";
import { deleteBan } from "../../../controllers/banController";

export default async function handler(req, res) {
    await connectToDatabase();
    switch (req.method) {
        case "POST":
           await createBan(req,res);
            break;
        case "GET":
          await getOneBan(req,res);
            break;
        case "PUT":
            await updateBan(req,res);
           
        case "DELETE":
           await deleteBan(req,res);
        default:
            res.status(400).json({ success: false});
            break;
    }


};