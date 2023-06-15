import { Box, Grid, Container,Stack,Button,Textarea, Heading, FormControl,Input,Tbody,Td,Tr,Thead,Table,FormLabel } from "@chakra-ui/react";
import Head from "next/head";

//import styled from "../styles/post.css";
//import ShowInfo from "../components/ShowInfo";

const Post = () => {
    return (
        <>
            <Container minH='92vh' minW='74vw' maxW='74vw' centerContent overflow='hidden'>
                <Heading textAlign={"center"} my={10}>Usuarios</Heading>
                <Button colorScheme="teal" /* onClick={() => router.push('/posts/create')} */ >Nueva Publicacion</Button>
                <FormControl>
                <FormLabel>Buscar usuario</FormLabel>
                <Input /* onChange={(e)=>getAll(e.target.value)} */ placeholder=" ingrese el Tema a buscar " type='text' />
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
                        {/* {showPosts()} */}
                    </Tbody>
                </Table>
            </Container>
        </>
    );
};

export default Post;


