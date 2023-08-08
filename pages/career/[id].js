import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import { Stack, Wrap, WrapItem } from '@chakra-ui/react'
import axios from "axios";
import Card from "../../components/Cards/Card.js";
import NavigationCard from "../../components/Cards/NavigationCard";
import { Text, Center, Box } from '@chakra-ui/react'
import HeaderCard from "../../components/Cards/HeaderCard";

export const getServerSideProps = async (context) => {
    const { id } = context.query;
    const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}:${process.env.PORT}/api/career/getOne/${id}`);
    const career = response.data.data;
    return {
        props: {
            career,
        },
    };
}


export default function Home({career}) {


    const displayCard = () => {
        if (career.subjects) return (<>
            {career.subjects.map((subject) => (
                <WrapItem>
                <NavigationCard
                    key={subject._id}
                    title={subject.subjectName}
                    image={subject.img ? `/uploads/${subject.img.fileName}` : null}
                    description={subject.description}
                    link={`/subject/${subject._id}`}
                    top={`${subject.posts.length} ${subject.posts.length !== 1 ? "Posts" : "Post"}`} />
                </WrapItem>
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
            <Box width="100%" maxW="500px" margin="auto">
                <Stack>
                <HeaderCard 
                    title={career.careerName} 
                    description={career.description} 
                    image={career.img} 
                    type={"career"} 
                    id={career._id}
                />
                </Stack>
                </Box>
            
                <Wrap spacing="20px" justify="center" mt='4'>
                {displayCard()}
                </Wrap>
                
            </Layout>
        </>
    )
}