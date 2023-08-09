import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { Wrap, WrapItem } from '@chakra-ui/react'
import Head from "next/head";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import Card from "../components/Cards/Card.js";
import NavigationCard from "../components/Cards/NavigationCard";
export const getServerSideProps = async () => {
    const response = await axios.get(`http://localhost:${process.env.PORT}/api/career/getAll`);
    const careers = response.data.data;
    return {
        props: {
            careers,
        },
    };
}

const Career = ({ careers }) => {

    const displayCard = () => {
        return (<>
            {careers.map((career) => (
                <WrapItem>
                <NavigationCard
                    key={career._id}
                    title={career.careerName}
                    description={career.description}
                    link={`/career/${career._id}`}
                    image={career.image}
                    top={`${career.subjects.length} ${career.subjects.length !== 1 ? "Asignaturas" : "Asignatura"}`} />
                </WrapItem>
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
                    <Text fontSize='4xl' fontWeight='bold' textAlign='center' color='white'>Todas las carreras</Text>
                    <Wrap spacing="20px" justify="center" mt='4'>

                    {displayCard()}
                    </Wrap>
                </Box>
            </Layout>
        </>
    );
};

export default Career;
