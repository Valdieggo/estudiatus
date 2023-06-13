import { Box } from "@chakra-ui/react";
import Head from "next/head";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";


const College = () => {
    const [colleges, setColleges] = useState([]);

    const getColleges = async () => {
        const { data } = await axios.get("/api/college/getAll");
        setColleges(data.data);
    };

    useEffect(() => {
        getColleges();
    }, []);

    return (
        <>
            <Head>
                <title>Colleges</title>
            </Head>
            <Layout>
                <Box>
                    <h1>Colleges</h1>
                    <ul>
                        {colleges.map((college) => (
                            <li key={college._id}>
                                <Link href={`/college/${college._id}`}>
                                    {college.collegeName}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Box>
            </Layout>
        </>
    );
};

export default College;
