import File from '../../../models/File';

import { connectToDatabase } from '../../../utils/db';

export default async (req, res) => {
    await connectToDatabase();
    try {
        const files = await File.find({});
        res.status(200).json({ files });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}