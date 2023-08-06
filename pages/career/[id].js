import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import Card from "../../components/Cards/card";
import { Text, Center, Box } from '@chakra-ui/react'
import HeaderCard from "../../components/Cards/HeaderCard";
export const getServerSideProps = async (context) => {
    const { id } = context.query;
    const response = await axios.get(`http://localhost:${process.env.PORT}/api/career/getOne/${id}`);
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
                    image={subject.img ? `/uploads/${subject.img.fileName}` : null}
                    description={subject.description}
                    link={`/subject/${subject._id}`}
                    top={`${subject.posts.length} ${subject.posts.length !== 1 ? "Posts" : "Post"}`} />
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
                <HeaderCard title={career.careerName} description={career.description} image={career.image} type={"career"} id={career._id}/>
                <Box p={4}>
                {displayCard()}
                </Box>
            </Layout>
        </>
    )
}