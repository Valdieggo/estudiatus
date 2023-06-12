import { createBan } from "../../../controllers/banController";
import { getOneBan } from "../../../controllers/banController";
import { updateBan } from "../../../controllers/banController";
import { deleteBan } from "../../../controllers/banController";

export default async function handler(req, res) {
    const {method}=req;
    switch (method) {
        case "POST":
           await createBan(req,res);
            break;
        case "GET":
          await getOneBan(req,res);
            break;
        case "PUT":
            await updateBan(req,res);
            break;
        case "DELETE":
           await deleteBan(req,res);
            break;
        default:
            res.status(400).json({ success: false});
            break;
    }


};