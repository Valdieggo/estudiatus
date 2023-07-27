import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import Card from "../../components/Cards/card";


import {
    Box,
    Text,
    Center
} from '@chakra-ui/react'




export const getServerSideProps = async (context) => {
    const { id } = context.query;
    const response = await axios.get(`http://localhost:${process.env.PORT}/api/college/getOne/${id}`);
    const college = response.data.data;
    return {
        props: {
            college,
        },
    };
}

//obtiene la informacion de un determinado college
export default function Home(data) {
   const {college} = data;

    const displayCard = () => {
            return (<>
                {college.careers.map((career) => (
                    <Card
                        key={career._id}
                        title={career.careerName}
                        image={"/lol.jpg"}
                        description={career.description}
                        link={`/career/${career._id}`}
                        top={`${career.subjects.length} ${career.subjects.length !== 1 ? "asignaturas" : "asignatura"}`} />
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