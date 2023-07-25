import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import {
    Card, CardHeader, CardBody, CardFooter, Image, Stack, Text, Button,
    Box,
    Center
} from '@chakra-ui/react'



//obtiene la informacion de un determinado college
export default function Home() {
    //obtiene la id del link
    const router = useRouter();

    //obtiene la informacion del college
    const [career, setCareer] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (router.isReady) {
            getCareer(router.query.id);
        }
    }, [
        router.isReady,
        !loading
    ]);


    const getCareer = async (id) => {
        const response = await axios.get(`/api/career/getOne/${id}`).then((res) => {
            setCareer(res.data.data);
        }).then(() => {
            getSubjects();
        })
    };

    const getSubjects = async () => {
        const response = await axios.get(`/api/subject/getAll`).then((res) => {
            const subjects = res.data.data.filter((subject) => subject.career === career._id);
            setSubjects(subjects);
            setLoading(false);
        });
    };

    const displayCard = () => {
        return (<>
            <Box display={"flex"}>
                {subjects.map((subject) => (
                    <Link href={`/subject/${subject._id}`}>
                        <Box
                            margin={"20px"}
                            maxW={'400px'}
                            height={'400px'}
                            maxH={'400px'}
                            boxShadow={'0 0 10px black'} rounded={'md'}
                            overflow={'hidden'}
                        >
                            <Box pos={'relative'}
                                alignItems={"center"} justifyContent={"center"}
                            >
                                <Image
                                    src={'/lol.jpg'}
                                    alt="Example"
                                    objectFit={'cover'}
                                    w={'100%'}
                                />
                            </Box>
                            <Stack>
                                <Text
                                    color={'green.500'}
                                    textTransform={'uppercase'}
                                    fontWeight={800}
                                    fontSize={'sm'}
                                    letterSpacing={1.1}>
                                    <Center>
                                        {subject.subjectName}
                                    </Center>
                                </Text>

                                <Text color={'gray.500'} textAlign={"center"}>
                                        {subject.description}
                                </Text>
                            </Stack>
                        </Box>
                    </Link >
                ))}
            </Box>






        </>)
    }
    return (
        <>
            <Head>
                <title>{career.careerName}</title>
            </Head>
            <Layout>
                <Text>{career.careerName}</Text>
                {displayCard()}


            </Layout>
        </>
    )
}