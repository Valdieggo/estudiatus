import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import CommentCard from "../../components/Comment/CommentCard";
import { VStack, Text, CardBody, IconButton, Box, Heading, Flex, Card, CardHeader, Image, CardFooter, Button, Avatar } from "@chakra-ui/react";
import AddCommentCard from "../../components/Comment/AddCommentCard";
import { BiLike, BiChat } from "react-icons/bi";
import { ChatIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { BsThreeDotsVertical } from "react-icons";

export default function Post({ post }) {
    const router = useRouter();
    let { id } = router.query;

    const [comments, setComments] = useState(post.comments);

    return (
        <Layout>
            <h1>Post: {post.title}</h1>
            <VStack spacing={4} align="center">
                <Card color="white" width="100%" maxWidth="500px" margin="auto" bg="post.100" borderRadius="md" p={4}
                    _hover={{
                        bg: "post.200",
                    }} >
                    <CardHeader >
                        <Flex spacing='4'>
                            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                <Avatar name={post.creator.username} src='https://bit.ly/broken-link' bg='blue.700' color='white' />

                                <Box>
                                    <Heading size='sm'>{post.creator.username}</Heading>
                                    <Text>Creator, {post.creator.role} </Text>
                                </Box>
                            </Flex>
                        </Flex>
                    </CardHeader>
                    <CardBody>
                        <Text>
                            {post.content}
                        </Text>
                    </CardBody>

                    <CardFooter
                        justify='space-between'
                        flexWrap='wrap'
                        sx={{
                            '& > button': {
                                minW: '136px',
                            },
                        }}
                    >
                        <Button type="button"
                            bg="button.100"
                            width="48%"
                            _hover={{
                                bg: "button.200",
                            }} leftIcon={<ArrowUpIcon />}>
                            Like
                        </Button>
                        <Button type="button"
                            bg="button.100"
                            width="48%"
                            _hover={{
                                bg: "button.200",
                            }} leftIcon={<ChatIcon />}>
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