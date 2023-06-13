import { createBan } from "../../../controllers/banController";
import { getBans } from "../../../controllers/banController";
import { updateBan } from "../../../controllers/banController";

export default async function handler(req, res) {
    const {method}=req;
    switch (method) {
        case "POST":
           await createBan(req,res);
            break;
        case "GET":
          await getBans(req,res);
            break;
        case "PUT":
            await updateBan(req,res);
            break;
        default:
            res.status(400).json({ success: false});
            break;
    }
};