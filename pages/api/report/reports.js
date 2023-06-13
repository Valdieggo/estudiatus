import { createReport } from "../../../controllers/reportController";
import { getReports } from "../../../controllers/reportController";
import { updateReport } from "../../../controllers/reportController";



export default async function handler(req, res) {
    const {method}=req;
    console.log("req",req.method);
    switch (method) {
        case "POST":
            await createReport(req,res);
            break;
        case "GET":
            await getReports(req,res);
            break;
        case "PUT":
            await updateReport(req,res);
            break;
        default:
            res.status(400).json({ success: false});
            break;
    }

};




