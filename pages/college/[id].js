import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

//obtiene la informacion de un determinado college
export default function Home() {
    const [college, setCollege] = useState([]);

    //obtiene la id del link
    const router = useRouter();
    const { id } = router.query;

    const getCollege = async () => {
        const { data } = await axios.get(`/api/college/getOne/${id}`);
        setCollege(data.data);
    };

    useEffect(() => {
        getCollege();
    }, []);
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Layout>
                <h1>{college.collegeName}</h1>
            </Layout>
        </>
    )
}