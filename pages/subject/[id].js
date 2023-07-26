import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { Text } from '@chakra-ui/react'


export const getServerSideProps = async (context) => {
    const { id } = context.query;
    const response = await axios.get(`http://localhost:3000/api/post/getAll`);
    const res2 = await axios.get(`http://localhost:3000/api/subject/getOne/${id}`);

    const subject = res2.data.data;
    const posts = response.data.data.filter((post) => post.subject === id);
    return {
        props: {
            posts,
            subject
        },
    };
}


export default function Home(data) {
    const {posts, subject} = data;

    return (
        <>
            <Head>
                <title>{subject.subjectName}</title>
            </Head>
            <Layout>
                <Text>TODO: Publicaciones creadas</Text>
            </Layout>
        </>
    )
}