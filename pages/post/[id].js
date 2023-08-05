// Post.js
import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import CommentCard from "../../components/Comment/CommentCard";
import PostCard from "../../components/Post/PostCard";
import { VStack, Box, Grid } from "@chakra-ui/react"; // Importamos Box y Grid de Chakra UI
import AddCommentCard from "../../components/Comment/AddCommentCard";
import { ChatIcon, ArrowUpIcon } from "@chakra-ui/icons";

export default function Post({ post }) {
    const router = useRouter();
    let { id } = router.query;

    const [comments, setComments] = useState(post.comments);

    return (
        <Layout>
        <Box width="100%" maxWidth="500px" margin="auto"> {/* Contenedor común para asegurar el ancho máximo */}
            <PostCard post={post} />
            <VStack spacing={4} align="center">
            <AddCommentCard post={post} setComments={setComments} comments={comments} />
            {comments && [...comments].reverse().map((comment) => (
                <CommentCard key={comment._id} comment={comment} setComments={setComments} comments={comments} />
            ))}
            </VStack>
        </Box>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const { id } = context.query;
    const res = await fetch(`http://localhost:3000/api/post/getOne/${id}`);
    const data = await res.json();
    if (res.status === 400) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            post: data.data,
        },
    };
}