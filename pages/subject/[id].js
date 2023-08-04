import Head from "next/head";
import { useState } from "react"; // Import useState from 'react'
import { useSession } from "next-auth/react";
import { Box, Textarea, Spinner, Button, Stack, useDisclosure } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import PostsCard from "../../components/Post/PostsCard";
import LoginModal from "../../components/Auth/LoginModal";
import CreatePost from "../../components/Post/CreatePost";

export const getServerSideProps = async (context) => {
    const { id } = context.query;
    const response = await axios.get(
        `http://localhost:${process.env.PORT}/api/post/getAllBysubject/${id}`
    );
    const res2 = await axios.get(
        `http://localhost:${process.env.PORT}/api/subject/getOne/${id}`
    );

    const subject = res2.data.data;
    const posts = response.data.data.filter((post) => post.subject === id);
    return {
        props: {
            posts,
            subject,
        },
    };
};

const PostsSubject = ({ posts, subject }) => {

    return (
        <Layout>
            <Box>
                <Stack>
                    <CreatePost subject={subject} />
                </Stack>
                {posts.map((post) => (
                    <PostsCard key={post._id} post={post} />
                ))}
            </Box>
        </Layout>
    );
};

export default PostsSubject;
