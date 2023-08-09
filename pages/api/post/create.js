import { connectToDatabase } from "../../../utils/db";
import Post from "../../../models/Post";
import Subject from "../../../models/Subject";
import User from "../../../models/User";
import sendMail from "../../../utils/mail";
import File from "../../../models/File";

export default async function handler(req, res) {
    const { method } = req;
    const { title, content, file, score, view, creator, subject, likes } = req.body;

    if (!title || !content || !creator) {
        return res.status(400).json({ success: false, message: "Empty fields" });
    }

    await connectToDatabase();

    switch (method) {
        case "POST":
            try {
                const post = await Post.create({
                    title,
                    content,
                    file,
                    likes,
                    score,
                    view,
                    creator,
                    subject,
                });

                const postPopulated = await Post.findById(post._id)
                    .populate({
                        path: "creator",
                        ref: "User",
                    })
                    .populate({
                        path: "subject",
                        ref: "Subject",
                    })
                    .populate({
                        path: "file",
                        model: File,
                    });

                await User.findByIdAndUpdate(creator, {
                    $push: { posts: post._id },
                });

                await Subject.findByIdAndUpdate(subject, {
                    $push: { posts: post._id },
                });

                const subjectInfo = await Subject.findById(subject).populate("subscribers");

                subjectInfo.subscribers.forEach( (subscriber) => {

                    sendMail(subscriber.email, subscriber.username, "Un nuevo post", `
                        <p>Por ${subscriber.username},</p>
                        <p>El nuevo post se titula "${title}" Fue creado en la Agnatura en la cual se subscribio: "${subjectInfo.subjectName}".</p>
                        <p>Revisalo en <a href="${process.env.NEXT_PUBLIC_URL}:${process.env.PORT}/post/${post._id}">Aqui</a>.</p>
                    `);
                });

                return res.status(200).json({ success: true, data: postPopulated });
            } catch (error) {
                return res.status(400).json({ success: false, message: error });
            }
        default:
            return res.status(400).json({ success: false, message: error });
    }
}