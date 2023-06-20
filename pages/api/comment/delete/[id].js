import { connectToDatabase } from "../../../../utils/db";
import Comment from "../../../../models/Comment";
import Post from "../../../../models/Post";

export default async function handler(req, res) {
    const { method } = req;

    connectToDatabase();

    switch (method) {
        case "DELETE":
            try {
                const { id } = req.query;
                if (!id) {
                    return res.status(400).json({ success: false, message: "Missing fields" });
                }
                
                const comment = await Comment.findById(id);

                if (!comment) {
                    return res.status(400).json({ success: false, message: "Comment not found" });
                }
                //console.log(comment.post.toString());
                const post = await Post.findById(comment.post);

                if (!post) {
                    return res.status(400).json({ success: false, message: "Post not found" });
                }

                post.comments.pull(id);
                
                await post.save();


                await Comment.findByIdAndDelete(id);

                return res.status(200).json({ success: true, data: id });

            }
            catch (error) {
                return res.status(400).json({ success: false, message: error });
            }

        default:
            return res.status(400).json({ success: false });

    }
}
