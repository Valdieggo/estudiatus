import { Box, Text } from "@chakra-ui/react";
import Head from "next/head";
import { Wrap, WrapItem } from '@chakra-ui/react'
import Layout from "../components/Layout/Layout";
import axios from "axios";
import Card from "../components/Cards/Card.js";
import NavigationCard from "../components/Cards/NavigationCard";

export const getServerSideProps = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}:${process.env.PORT}/api/subject/getAll`);
    const subjects = response.data.data;
    return {
        props: {
            subjects,
        },
    };
}

const Subject = ({ subjects }) => {

    const displayCard = () => {
        return (<>
            {subjects.map((subject) => (
                <WrapItem>
                <NavigationCard
                    key={subject._id}
                    title={subject.subjectName}
                    image={subject.img ? `/uploads/${subject.img.fileName}` : null}
                    description={subject.description}
                    link={`/subject/${subject._id}`}
                    top={`${subject.posts.length} ${subject.posts.length !== 1 ? "Publicaciones" : "Publicacione"}`}
                    footer={`${subject.subscribers.length} ${subject.subscribers.length !== 1 ? "subscriptores" : "subscriptor"}`}
                />
                </WrapItem>
            ))}
        </>
        )
    }
    return (
        <>
            <Head>
                <title></title>
            </Head>
            <Layout>
                <Box>
                    <Text fontSize='4xl' fontWeight='bold' textAlign='center' color='white'>Todas las Asignaturas</Text>
                    <Wrap spacing="20px" justify="center" mt='4'>
                    {displayCard()}
                    </Wrap>
                </Box>
            </Layout>
        </>
    );
}

export default Subject;
