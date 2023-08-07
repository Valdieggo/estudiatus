import File from '../../../../models/File';
import { connectToDatabase } from '../../../../utils/db';
import path from 'path';
import fs from 'fs';

export default async function handler(req, res) {
    const { method } = req;
    const { id } = req.query;
    if (!id) {
        return res.status(400).json({ success: false, message: "No ID provided" });
    }

    await connectToDatabase();

    //obtiene el archivo
    switch(method){
        case "GET":
            try {
                const file = await File.findById(id);
                const filePath = path.resolve('.','public','uploads',file.fileName);
                const fileBuffer = fs.readFileSync(filePath);
                

                res.setHeader('Content-Disposition', `attachment; filename=${file.originalName}`);
                res.send(fileBuffer);
            }
            catch (error) {
                return res.status(400).json({ success: false, message: error });
            }
        default:
            return res.status(400).json({ success: false });
    }

}