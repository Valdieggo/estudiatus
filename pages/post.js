import { Box } from "@chakra-ui/react";
import Head from "next/head";
import Layout from "../components/Layout/Layout";
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

export const getServerSideProp = async(context)=>{
const res = await fecth ("http://localhost:3000/api/Discuss/")
}