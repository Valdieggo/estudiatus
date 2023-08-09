import { Box, Text } from "@chakra-ui/react";
import Head from "next/head";
import { Wrap, WrapItem } from '@chakra-ui/react'
import Layout from "../components/Layout/Layout";
import axios from "axios";
import Card from "../components/Cards/Card.js";
import NavigationCard from "../components/Cards/NavigationCard";
export const getServerSideProps = async () => {
    const response = await axios.get(`http://localhost:${process.env.PORT}/api/college/getAll`);
    const colleges = response.data.data;
    return {
        props: {
            colleges,
        },
    };
}

const College = ({colleges}) => {

    const displayCard = () => {
        return (<>
            {colleges.map((college) => (
                <WrapItem>
                <NavigationCard
                    key={college._id}
                    title={college.collegeName}
                    image={college.img}
                    description={college.description}
                    link={`/college/${college._id}`}
                    top={`${college.careers.length} ${college.careers.length !== 1 ? "Carreras" : "Carrera"}`} />
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
                    <Text fontSize='4xl' fontWeight='bold' textAlign='center' color='white'>Todas las universidades</Text>
                    <Wrap spacing="20px" justify="center" mt='4'>
                    {displayCard()}
                    </Wrap>
                </Box>
            </Layout>
        </>
    );
};

export default College;
