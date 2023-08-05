import { Box, Text } from "@chakra-ui/react";
import Head from "next/head";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import Card from "../components/Cards/card";

export const getServerSideProps = async () => {
    const response = await axios.get(`http://localhost:${process.env.PORT}/api/college/getAll`);
    const colleges = response.data.data;
    return {
        props: {
            colleges,
        },
    };
}

const College = (data) => {
    const { colleges } = data

    const displayCard = () => {
        return (<>
            {colleges.map((college) => (
                <Card
                    key={college._id}
                    title={college.collegeName}
                    image={"/lol.jpg"}
                    description={college.description}
                    link={`/college/${college._id}`}
                    top={`${college.careers.length} ${college.careers.length !== 1 ? "Publicaciones" : "Publicación"}`} />
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
                    <Text>Colleges</Text>
                    <Text>Todas las carreras disponibles</Text>
                    {displayCard()}
                </Box>
            </Layout>
        </>
    );
};

export default College;
