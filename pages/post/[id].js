import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import CommentCard from "../../components/Comment/CommentCard";
import { VStack,Text,CardBody,Icon,Box,Heading,Flex,Card,CardHeader,Image,CardFooter,Button,Avatar} from "@chakra-ui/react";
import AddCommentCard from "../../components/Comment/AddCommentCard";
import { ArrowUpIcon, ChatIcon} from "@chakra-ui/icons";
export default function Post({ post }) {
    const router = useRouter();
    let { id } = router.query;

    const [comments, setComments] = useState(post.comments);

    return (
        <Layout>
            
            <VStack spacing={4} align="center">
            <Card maxW='md'>
                <CardHeader>
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar name='emerson salazar' src='https://bit.ly/sage-adebayo' />

                            <Box>
                                <Heading size='sm'>Segun Adebayo</Heading>
                                <Text>{post.creator.username} Chakra UI</Text>
                            </Box>
                        </Flex>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <Text>
                        With Chakra UI, I wanted to sync the speed of development with the speed
                        of design. I wanted the developer to be just as excited as the designer to
                        create a screen.
                    </Text>
                </CardBody>
                <Image
                    objectFit='cover'
                    src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                    alt='Chakra UI'
                />

                <CardFooter
                    justify='space-between'
                    flexWrap='wrap'
                    sx={{
                        '& > button': {
                            minW: '136px',
                        },
                    }}
                >
                    <Button flex='1' variant='ghost' leftIcon={<ArrowUpIcon/>}>
                        Like
                    </Button>
                    <Button flex='1' variant='ghost' leftIcon={<ChatIcon/>}>
                        Comment 
                    </Button>
                </CardFooter>
            </Card>
            </VStack>
            <VStack spacing={4} align="center">
                <AddCommentCard post={post} setComments={setComments} comments={comments} />
                {comments && comments.map((comment) => (
                    <CommentCard key={comment._id} comment={comment} setComments={setComments} comments={comments} />
                ))}
            </VStack>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const { id } = context.query;
    const res = await fetch(`http://localhost:3000/api/post/getOne/${id}`);
    const data = await res.json();
    if (res.status === 400) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            post: data.data,
        },
    };
}