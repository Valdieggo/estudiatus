import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Box } from "@chakra-ui/layout";

//obtiene la informacion de un determinado college
export default function Home() {
    //obtiene la id del link
    const router = useRouter();

    //obtiene la informacion del college
    const [college, setCollege] = useState([]);
    const [careers, setCareers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (router.isReady) {
            getCollege(router.query.id);
        }
    }, [
        router.isReady,
        !loading
    ]);


    const getCollege = async (id) => {
        const response = await axios.get(`/api/college/getOne/${id}`).then((res) => {
            setCollege(res.data.data);
        }).then(() => {
            getCareers();
        });
    };

    const getCareers = async () => {
        //OBTIENE TODAS LAS CARRERAS Y LUEGO FILTRA POR LA ID OBTENIDA
        const response = await axios.get(`/api/career/getAll`).then((res) => {
            const careers = res.data.data.filter((career) => career.college === college._id);
            setCareers(careers);
        });
        setLoading(false);
    };

    return (
        <>
            <Box>
                <Head>
                    <title>{college.collegeName}</title>
                </Head>
                <Layout>
                    <h1>{college.collegeName}</h1>
                    <img src={`/photo.svg`} alt={`logo`} width="20px" height="20px" />
                    <ul>
                        {careers.map((career) => (
                            <li key={career._id}>
                                <Link href={`/career/${career._id}`}>
                                    {career.careerName}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Layout>
            </Box>
        </>
    )
}