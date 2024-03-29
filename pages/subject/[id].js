import Head from "next/head";
import { useState } from "react"; // Import useState from 'react'
import { useSession } from "next-auth/react";
import { Box, Textarea, Spinner, Button, Stack, useDisclosure } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import PostsCard from "../../components/Post/PostsCard";
import CreatePost from "../../components/Post/CreatePost";
import PaginationControls from "../../components/Post/PaginationControls.js";
import HeaderCard from "../../components/Cards/HeaderCard";
import PostSearch from "../../components/Post/PostSearch";

const PostsSubject = ({ posts, subject }) => {
    const toggleCreatePost = () => {
        setShowCreatePost(!showCreatePost);
    };
    const [allPosts, setAllPosts] = useState(posts);
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);

    const totalPages = Math.ceil(allPosts.length / postsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearch = (searchQuery) => {
        const filteredPosts = posts.filter(
            (post) =>
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.content.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setAllPosts(filteredPosts);
        setCurrentPage(1);
    };


    return (
        <Layout>
            <PostSearch handleSearch={handleSearch} />
            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            />
            <Box width="100%" maxW="500px" margin="auto">
                <Stack>
                    <HeaderCard title={subject.subjectName} description={subject.description} image={subject.img ? `/uploads/${subject.img.fileName}` : '/estudiatus-pattern.svg'}
                        type={"subject"} id={subject._id}
                    />
                    <Box display="flex" justifyContent="center">
                        <Button
                            color="white"
                            width="100%"
                            maxWidth="500px"

                            bg="post.100"
                            borderRadius="md"
                            _hover={{
                                bg: "post.200",
                            }}
                            onClick={toggleCreatePost}
                        >
                            {showCreatePost ? "Cancelar creacion" : "Crear una publicacion"}
                        </Button>
                    </Box>

                    {showCreatePost &&
                        <CreatePost allPosts={allPosts} setAllPosts={setAllPosts} subject={subject} />}
                </Stack>
                {currentPosts.map((post) => (
                    <PostsCard key={post._id} post={post} setAllPosts={setAllPosts} allPosts={allPosts} title={subject.subjectName} subjectId={subject._id} />
                ))}
            </Box>
            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            />
        </Layout >
    );
};

export default PostsSubject;

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
