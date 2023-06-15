import { Box, Grid, Container, Stack, Button, Textarea, Heading, FormControl, Input, Tbody, Td, Tr, Thead, Table, FormLabel } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout/Layout";


//import styled from "../styles/post.css";
//import ShowInfo from "../components/ShowInfo";

const PostAdm = () => {

    const [posts, setPosts] = useState([]);
    const [postFind, setPost] = useState();
    const [loading, setLoading] = useState(true);
    const router = useRouter()

    const getPosts = async () => {
        const response = await axios.get("/api/post/getAll").then((response) => {
            setPosts(response.data.data)
            setLoading(false)
        })
    }

    const getPostFind = async (title) => {
        setPost(null)
        posts.map(post => {
            if (post.title === title) {
                setPost(post)
                console.log("dentro del if")
            }
            console.log("map")
        })
        console.log("dentro de funcion")
    }

    useEffect(() => {
        getPosts()
    }, [!loading])

    const showPosts = () => {
        if (!postFind) {
            return posts.map(post => {
                return (
                    <Tr key={post._id}>
                        <Td>{post.title}</Td>
                        <Td>{post.subject}</Td>
                        <Td>{post.creator}</Td>
                        <Td><Button onClick={() => router.push(`/post/view/${post._id}`)}>Ver mas</Button></Td>
                        <Td><Button colorScheme="teal" onClick={() => router.push(`/post/edit/${postFind._id}`)}>Edit Post</Button></Td>
                    </Tr>
                )
            })
        }
        else {
            console.log("dentro del else")
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
            <Box>
                {
                    loading ? <h1>Cargando...</h1> :
                        <>
                            <Layout>
                                <Container minH='92vh' minW='74vw' maxW='74vw' centerContent overflow='hidden'>
                                    <Heading textAlign={"center"} my={10}>Publicaciones</Heading>
                                    <Button colorScheme="teal" /* onClick={() => router.push('/posts/create')} */ >Nueva Publicacion</Button>
                                    <FormControl>
                                        <FormLabel>Buscar Publicacion</FormLabel>
                                        <Input onChange={(e) => getPostFind(e.target.value)} placeholder=" ingrese el Tema a buscar " type='text' />
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
                            </Layout>
                        </>
                }
            </Box>
        </>
    );
};

export default PostAdm;


