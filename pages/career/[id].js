import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Card from "../../components/Cards/card";

import { Text, Center, Box } from '@chakra-ui/react'

export const getServerSideProps = async (context) => {
    const { id } = context.query;
    const response = await axios.get(`http://localhost:3000/api/career/getOne/${id}`);
    const career = response.data.data;
    return {
        props: {
            career,
        },
    };
}


export default function Home(res) {
    const {career} = res;


    const displayCard = () => {
        if (career.subjects) return (<>
            {career.subjects.map((subject) => (
                <Card
                    key={subject._id}
                    title={subject.subjectName}
                    image={"/lol.jpg"}
                    description={subject.description}
                    link={`/subject/${subject._id}`}
                    top={`${subject.posts.length} ${subject.posts.length !== 1 ? "publicaciones" : "publicación"}`} />
            ))}
        </>
        )
    }
    return (
        <>
            <Head>
                <title>{career.careerName}</title>
            </Head>
            <Layout>
                <Center>
                    <Text>{career.careerName}</Text>
                </Center>
                <Text>Asignaturas Disponibles</Text>
                {displayCard()}
            </Layout>
        </>
    )
}