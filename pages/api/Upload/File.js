
//crea una api para subir archivos  de maximo 10MB
import FileModel from '../../../models/File';
import multer from 'multer';
import path from 'path';
import { connectToDatabase } from '../../../utils/db';
import fs from 'fs';


export const config = {
    api: {
      bodyParser: false
    }
  }

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const route = path.join(process.cwd(), '/public/uploads/');
        if(!fs.existsSync(route)) fs.mkdirSync(route , { recursive: true });

        cb(null, path.join(route));
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    dest: path.join('/public/uploads/files'),
    limits: { fileSize: 10000000 },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif|pdf|doc|docx|xls|xlsx|ppt|pptx|txt/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        file.fieldname = file.filename;
        if (mimetype && extname) return cb(null, true);
        cb("Error: Archivo debe ser una imagen valida");
    }
}).single('file');

export default async (req, res) => {
    await connectToDatabase();
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ msg: err.message });
            }
            console.log(req.file)
            const {filename, originalname, path, mimetype, size } = req.file;
            const File = await FileModel.create({
                originalName: originalname,
                fileName: filename,
                path,
                size,
                mimetype,
            });
            res.status(200).json({ File });
        });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}