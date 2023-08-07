import { Box, Text } from "@chakra-ui/react";
import Head from "next/head";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import Card from "../components/Cards/Card";


export const getServerSideProps = async () => {
    const response = await axios.get(`http://localhost:${process.env.PORT}/api/subject/getAll`);
    const subjects = response.data.data;
    return {
        props: {
            subjects,
        },
    };
}

const Subject = (data) => {
    const { subjects } = data

    const displayCard = () => {
        return (<>
            {subjects.map((subject) => (
                <Card
                    key={subject._id}
                    title={subject.subjectName}
                    image={subject.img ? `/uploads/${subject.img.fileName}` : null}
                    description={subject.description}
                    link={`/subject/${subject._id}`}
                    top={`${subject.posts.length} ${subject.posts.length !== 1 ? "Publicaciones" : "Publicacione"}`} 
                    footer={`${subject.subscribers.length} ${subject.subscribers.length !== 1 ? "subscriptores" : "subscriptor"}`} 
                    />
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
                    <Text>Subjects</Text>
                    <Text>Todas las asignaturas disponibles</Text>
                    {displayCard()}
                </Box>
            </Layout>
        </>
    );
}

export default Subject;
