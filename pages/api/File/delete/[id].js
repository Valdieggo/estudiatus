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

    switch (method) {
        case "DELETE":
            try {
                const file = await File.findById(id);
                //elimina el archivo local
                try {
                    fs.unlinkSync(path.join(process.cwd(), '/public/uploads/', file.fileName));
                }
                catch (error) {
                    console.log(error);
                }
                //elimina el archivo de la base de datos
                await File.findByIdAndRemove(id);
                
                return res.status(200).json({ success: true, data: file });
            }
            catch (error) {
                return res.status(400).json({ success: false, message: error });
            }
        default:
            return res.status(400).json({ success: false });
    }
}