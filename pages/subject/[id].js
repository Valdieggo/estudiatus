import Head from "next/head";
import { useState } from "react"; // Import useState from 'react'
import { useSession } from "next-auth/client";
import { Box, Textarea, Spinner, Button, Stack } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import PostsCard from "../../components/Post/PostsCard";
import LoginModal from "../../components/Auth/LoginModal";

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
    const { data: session, status } = useSession();
    const [isAddingPost, setIsAddingPost] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleAddPost = () => {
        if (status === "authenticated") {
            setIsAddingPost(true);
            axios
                .post(`http://localhost:${process.env.PORT}/api/post/create/`, {
                    title: title,
                    content: content,
                    creator: session.user.id,
                    subject: subject._id,
                })
                .then((res) => {
                    setTitle("");
                    setContent("");
                    setPosts((prevPosts) => [...prevPosts, res.data.data]);
                    setIsAddingPost(false);
                    router.push("/");
                })
                .catch((err) => {
                    console.log(err);
                    setIsAddingPost(false);
                });
        } else {
            onOpen();
        }
    };

    const handlerTitle = (e) => {
        setTitle(e.target.value);
    };

    const handlerContent = (e) => {
        setContent(e.target.value);
    };

    return (
        <Layout>
            <Box>
                <Stack>
                    <Box
                        color="white"
                        width="100%"
                        maxWidth="500px"
                        margin="auto"
                        bg="post.100"
                        borderRadius="md"
                        p={4}
                        mt={4}
                        _hover={{
                            bg: "post.200",
                        }}
                    >
                        <Textarea
                            placeholder="Estibe un Titulo"
                            value={title}
                            onChange={handlerTitle}
                            my={4}
                        />
                        <Textarea
                            placeholder="Estibe tu contenido"
                            value={content}
                            onChange={handlerContent}
                            my={4}
                        />

                        <Button
                            type="button"
                            bg="button.100"
                            width="100%"
                            isDisabled={isAddingPost}
                            _hover={{
                                bg: "button.200",
                            }}
                            onClick={handleAddPost}
                            leftIcon={isAddingPost ? <Spinner /> : <ChatIcon />}
                        >
                            Añadir comentario
                        </Button>
                        <LoginModal isOpen={isOpen} onClose={onClose} />
                    </Box>
                </Stack>
                {posts.map((post) => (
                    <PostsCard key={post._id} post={post} />
                ))}
            </Box>
        </Layout>
    );
};

export default PostsSubject;
