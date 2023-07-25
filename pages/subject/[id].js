import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
    Card, CardHeader, CardBody, CardFooter, Image, Stack, Text, Button,
    Box,
    Center
} from '@chakra-ui/react'

export default function Home() {
    const router = useRouter();

    const [subject, setSubject] = useState([]);
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (router.isReady) {
            getSubject(router.query.id);
        }
    }, [
        router.isReady,
        !loading
    ]);

    const getSubject = async (id) => {
        const response = await axios.get(`/api/subject/getOne/${id}`).then((res) => {
            setSubject(res.data.data);
        }).then(() => {
            getPosts();
        })
    };

    const getPosts = async () => {
        const response = await axios.get(`/api/post/getAll`).then((res) => {
            const posts = res.data.data.filter((post) => post.subject === subject._id);
            setPosts(posts);
            setLoading(false);
        });
    };

    const displayCard = () => {
        return (<>
            <Box display={"flex"}>
                {posts.map((post) => (
                    <Link href={`/post/${post._id}`}>
                        <Box
                            margin={"20px"}
                            maxW={'400px'}
                            height={'400px'}
                            maxH={'400px'}
                            boxShadow={'0 0 10px black'} rounded={'md'}
                            overflow={'hidden'}
                        >
                            <Box pos={'relative'}
                                alignItems={"center"} justifyContent={"center"}
                            >
                                <Image
                                    src={'/lol.jpg'}
                                    alt="Example"
                                    objectFit={'cover'}
                                    w={'100%'}
                                />
                            </Box>
                            <Stack>
                                <Text
                                    color={'green.500'}
                                    textTransform={'uppercase'}
                                    fontWeight={800}
                                    fontSize={'sm'}
                                    letterSpacing={1.1}>
                                    <Center>
                                        {post.title}
                                    </Center>
                                </Text>

                                <Text color={'gray.500'} textAlign={"center"}>
                                    {post.content}
                                </Text>
                            </Stack>
                        </Box>
                    </Link >
                ))}
            </Box>
        </>
        )
    }
    return (
        <>
            <Head>
                <title>{subject.subjectName}</title>
            </Head>
            <Layout>
                <h1>{subject.subjectName}</h1>
               {displayCard()}
            </Layout>
        </>
    )
}