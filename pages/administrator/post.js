import { Box, Grid, Container, Stack, Button, Textarea, Heading, FormControl, Input, Tbody, Td, Tr, Thead, Table, FormLabel } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import DeleteButtonPost from "../../components/Post/DeleteButtonPost";


//import styled from "../styles/post.css";
//import ShowInfo from "../components/ShowInfo";

const PostAdm = () => {

    const [posts, setPosts] = useState([]);
    const [postFind, setPost] = useState();
    const [loading, setLoading] = useState(true);
    const [subjects, setSubject] = useState([]);
    const [users, setUsers] = useState([]);
    const router = useRouter()

    const getPosts = async () => {
        const response = await axios.get("/api/post/getAll").then((response) => {
            setPosts(response.data.data)
            getSubjetc(response.data.data)
            getUser(response.data.data)
            setLoading(false)
        })
    }

    const handeleDelete = async(id)=>{
        const response = await axios.delete(`/api/post/delete/${id}`).then((res)=>{
            router.push("/administrator/post");
        })
        getPosts();
    }

    const getPostFind = async (title) => {
        setPost(null);
        posts.map(post => {
            let found = true;
            if (post.title.length === title.length) {
                for (let i = 0; i < post.title.length; i++) {
                    if (post.title[i] !== title[i]) {
                        found = false;
                        break;
                    }
                }
            } else {
                found = false;
            }
            if (found) {
                setPost(post);
                console.log("dentro del if");
            }
            console.log("map");
        });
        console.log("dentro de la función");
    }

    const getSubjetc = async (post) => {
        const response = await axios.get(`/api/subject/getAll`).then((res) => {
            setSubject(res.data.data);
            for (let i = 0; i < post.length; i++) {
                for (let j = 0; j < subjects.length; j++) {
                    if (post[i].subject == subjects[j]._id) {
                        post[i].subjectName = subjects[j].subjectName;
                    }
                }
            }
            setLoading(false);
        })
    };

    const getUser = async (post) => {
        const response = await axios.get(`/api/user/getAll`).then((res) => {
            setUsers(res.data.data);
            for (let i = 0; i < post.length; i++) {
                for (let j = 0; j < users.length; j++) {
                    if (post[i].creator == users[j]._id) {
                        post[i].username = users[j].username;
                    }
                }
            }
            setLoading(false);
        })
    };

    useEffect(() => {
        getPosts()
    }, [!loading])

    const showPosts = () => {
        if (!postFind) {
            return posts.map(post => {
                return (
                    <Tr key={post._id}>
                        <Td>{post.title}</Td>
                        <Td>{post.username}</Td>
                        <Td>{post.subjectName}</Td>
                        <Td>{post.createDate}</Td>
                        <Td><Button onClick={() => router.push(`/post/view/${post._id}`)}>Ver mas</Button></Td>
                        <Td><Button colorScheme="teal" onClick={() => router.push(`/post/edit/${postFind._id}`)}>Edit Post</Button></Td>
                        <Td><Button colorScheme="red" onClick={() => handeleDelete(post._id)}>Delete Post</Button></Td>
                    </Tr>
                )
            })
        }
        else {
            console.log("dentro del else")
            return (
                <Tr key={postFind._id}>
                    <Td>{postFind.title}</Td>
                    <Td>{postFind.subjectName}</Td>
                    <Td>{postFind.username}</Td>
                    <Td>{postFind.createDate}</Td>
                    <Td><Button onClick={() => router.push(`/post/view/${post._id}`)}>View more</Button></Td>
                    <Td><Button colorScheme="teal" onClick={() => router.push(`/post/edit/${postFind._id}`)}>Edit Post</Button></Td>
                    <Td><DeleteButtonPost post={post} allPosts={allPosts} setAllPosts={setAllPosts} /></Td>
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
                                                <Td>Materia</Td>
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


