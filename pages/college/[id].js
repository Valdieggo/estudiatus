import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import Card from "../../components/Cards/Card.js";


import {
    Box,
    Text,
    Center
} from '@chakra-ui/react'




export const getServerSideProps = async (context) => {
    const { id } = context.query;
    const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}:${process.env.PORT}/api/college/getOne/${id}`);
    const college = response.data.data;
    return {
        props: {
            college,
        },
    };
}

//obtiene la informacion de un determinado college
export default function Home({college}) {

    const displayCard = () => {
            return (<>
                {college.careers.map((career) => (
                    <Card
                        key={career._id}
                        title={career.careerName}
                        image={career.img}
                        description={career.description}
                        link={`/career/${career._id}`}
                        top={`${career.subjects.length} ${career.subjects.length !== 1 ? "Carreras" : "Carrera"}`} />
                ))}
            </>
            )
    }
    return (
        <>
            <Head>
                <title>{college.collegeName}</title>
            </Head>
            <Layout>
                <Center>
                    <Text>{college.collegeName}</Text>
                </Center>
                {displayCard()}
            </Layout>
        </>
    )
}