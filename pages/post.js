import { Box, Grid, Container,Stack,Button,Textarea } from "@chakra-ui/react";
import Head from "next/head";
import Layout from "../components/Layout/Layout";

import styled from "../styles/post.css";

const Post = () => {
    return (
        <>
            <Head>
                <title>Post PRUEBA</title>
            </Head>
            <Layout>
                <Box>
                    <h1>Post</h1>
                </Box>
            </Layout>
        </>
    );
};

export default Post;


