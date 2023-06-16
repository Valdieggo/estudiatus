import { createAppeal, getUserAppeals, deleteAppeal } from "../../../controllers/appealController";


export default async function handler(req, res) {
    await connectToDatabase();
    switch (req.method) {
        case "POST":
           await createAppeal(req,res);
            break;
        case "GET":
          await getUserAppeals(req,res);
            break;
        case "PUT":
           
        case "DELETE":
           await deleteAppeal(req,res);
           break;
        default:
            res.status(400).json({ success: false});
            break;
    }


};