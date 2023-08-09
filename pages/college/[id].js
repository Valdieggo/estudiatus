import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import Card from "../../components/Cards/Card.js";
import NavigationCard from "../../components/Cards/NavigationCard";
import { Wrap, WrapItem } from '@chakra-ui/react'

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
                    <WrapItem>
                    <NavigationCard
                        key={career._id}
                        title={career.careerName}
                        image={career.img}
                        description={career.description}
                        link={`/career/${career._id}`}
                        top={`${career.subjects.length} ${career.subjects.length !== 1 ? "Asignaturas" : "Asignatura"}`} />
                    </WrapItem>
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
                <Box>
                    <Text fontSize='4xl' fontWeight='bold' textAlign='center' color='white'>{college.collegeName}</Text>
                    <Wrap spacing="20px" justify="center" mt='4'>
                        {displayCard()}
                    </Wrap>
                </Box>
            </Layout>
        </>
    )
}