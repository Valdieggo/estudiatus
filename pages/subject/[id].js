import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { Box, Text, Card, Flex, CardBody, Avatar, CardHeader, CardFooter, Heading, Button, VStack, Stack, useDisclosure } from '@chakra-ui/react';
import { ArrowUpIcon, ChatIcon } from '@chakra-ui/icons';
import PostsCard from '../../components/Post/PostsCard';


export const getServerSideProps = async (context) => {
    const { id } = context.query;
    const response = await axios.get(`http://localhost:${process.env.PORT}/api/post/getAllBysubject/${id}`);
    const res2 = await axios.get(`http://localhost:${process.env.PORT}/api/subject/getOne/${id}`);

    const subject = res2.data.data;
    const posts = response.data.data.filter((post) => post.subject === id);
    return {
        props: {
            posts,
            subject
        },
    };
}

const PostsSubject = ({ posts }) => {
    return (
        <Layout>
            <Box>
                <Stack>

                </Stack>
                {posts.map((post) => (
                    <PostsCard key={post._id} post={post} />
                ))}
            </Box>
        </Layout>
    );
};

export default PostsSubject;