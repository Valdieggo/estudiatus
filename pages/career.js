import { Box } from "@chakra-ui/react";
import Head from "next/head";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import Card from "../components/Cards/card";

export const getServerSideProps = async () => {
    const response = await axios.get(`http://localhost:${process.env.PORT}/api/career/getAll`);
    const careers = response.data.data;
    return {
        props: {
            careers,
        },
    };
}

const Career = (data) => {
    const {careers} = data;
    
    const displayCard = () => {
        return (<>
            {careers.map((career) => (
                <Card
                    key={career._id}
                    title={career.careerName}
                    description={career.description}
                    link={`/career/${career._id}`}
                    top={`${career.subjects.length} ${career.subjects.length !== 1 ? "Asignaturas" : "Asignatura"}`} />
            ))}
        </>
        )
    }
    
    return (
        <>
            <Head>
                <title>Todas las carreras</title>
            </Head>
            <Layout>
                <Box>
                    <h1>Todas las carreras</h1>
                    {displayCard()}
                </Box>
            </Layout>
        </>
    );
};

export default Career;
