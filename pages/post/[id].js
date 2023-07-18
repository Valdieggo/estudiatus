import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import CommentCard from "../../components/Comment/CommentCard";
import { VStack } from "@chakra-ui/react";
import AddCommentCard from "../../components/Comment/AddCommentCard";

export default function Post({ post }) {
    const router = useRouter();
    let { id } = router.query;

    const [comments, setComments] = useState(post.comments);

    return (
        <Layout>
            <h1>Post: {post.title}</h1>
            <p>Esto se deberia cambiar por el componente PostCard</p>
            <VStack spacing={4} align="center">
                <AddCommentCard post={post} setComments={setComments} comments={comments}/>
                {comments && comments.map((comment) => (
                <CommentCard key={comment._id} comment={comment} setComments={setComments} comments={comments}/>
            ))}
            </VStack>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const { id } = context.query;
    const res = await fetch(`http://localhost:3000/api/post/getOne/${id}`);
    const data = await res.json();
    if(res.status === 400) {
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