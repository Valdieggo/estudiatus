import { Box, Grid, Container, Stack, Button, Textarea, Heading, FormControl, Input, Tbody, Td, Tr, Thead, Table, FormLabel } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

//import styled from "../styles/post.css";
//import ShowInfo from "../components/ShowInfo";

const PostAdm = () => {

    const [posts, setPosts] = useState([]);
    const [postFind, setPost] = useState();
    const router = useRouter()

    const getPosts = async () => {
        const response = await fetch('http://localhost:3000/api/posts/getAll');
        setPosts(response.data)
    }

    const getPost = async () => {
        setPost(null)
        posts.map(post => {
            if (post._id === _id) {
                setPosts(post)
                return _id
            }
        })
    }

    useEffect(() => {
        getPosts()
    }, [])

    const showPosts = () => {
        if (!postFind) {
            return posts.map(post => {
                return (
                    <Tr key={post._id}>
                        <Td>{post.title}</Td>
                        <Td>{post.subject}</Td>
                        <Td>{post.creator}</Td>
                        <Td><Button onClick={() => router.push(`/post/view/${post._id}`)}>Ver mas</Button></Td>
                        <Td><Button colorScheme="teal" onClick={() => router.push(`/post/edit/${user._id}`)}>Edit Post</Button></Td>
                    </Tr>
                )
            })
        }
        else {
            return (
                <Tr key={postFind._id}>
                    <Td>{postFind.title}</Td>
                    <Td>{postFind.subject}</Td>
                    <Td>{postFind.creator}</Td>
                    <Td><Button onClick={() => router.push(`/post/view/${post._id}`)}>Ver mas</Button></Td>
                    <Td><Button colorScheme="teal" onClick={() => router.push(`/post/edit/${postFind._id}`)}>Edit Post</Button></Td>
                </Tr>
            )
        }
    }


    return (
        <>
            <Container minH='92vh' minW='74vw' maxW='74vw' centerContent overflow='hidden'>
                <Heading textAlign={"center"} my={10}>Publicaciones</Heading>
                <Button colorScheme="teal" /* onClick={() => router.push('/posts/create')} */ >Nueva Publicacion</Button>
                <FormControl>
                    <FormLabel>Buscar Publicacion</FormLabel>
                    <Input onChange={(e) => getPost(e.target.value)} placeholder=" ingrese el Tema a buscar " type='text' />
                </FormControl>

                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Td>Tema</Td>
                            <Td>Creador</Td>
                            <Td>Fecha de creacion</Td>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {showPosts()}
                    </Tbody>
                </Table>
            </Container>
        </>
    );
};

export default PostAdm;


