import { VStack, Text, CardBody, IconButton, Box, Heading, Flex, Card, CardHeader, Image, CardFooter, Button, Avatar, Icon, Tag, TagLabel, TagCloseButton, HStack } from "@chakra-ui/react";
import { ChatIcon, ArrowUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import LikePostButton from "./LikePostButton";
import PopOptions from "./PopOptions";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState } from "react";
import axios from "axios";



export default function PostsCard({ post,setAllPost, allPosts }) {
    const {creator} = post

    let isCreatorId = false;
    const {data: session,status}=useSession();
    if (session) {
        isCreatorId = session.user.id === creator._id;
    }
    const router = useRouter()

    const handeleDeletPost =()=>{
        axios.delete(`http://localhost:3000/api/post/delete/${post._id}`)
        .then(res=>{
            console.log(res.data.data)
            setAllPost(allPosts.filter((post)=>post._id !== res.data.data._id))
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return (
        <VStack key={post.id} margin={"5"} spacing={4} align="center">
            <Card color="white" width="100%" maxWidth="500px" margin="auto" bg="post.100" borderRadius="md" p={4}
                _hover={{
                    bg: "post.200",
                }} >
                <CardHeader >
                    <Flex spacing="4">
                        {post.creator && ( // Renderiza condicionalmente si post.creator está definido
                            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                                <Avatar
                                    name={creator.username}
                                    src="https://bit.ly/broken-link"
                                    bg="blue.700"
                                    color="white"
                                />
                                <Box>
                                    <Heading size="sm">{creator.username}</Heading>
                                    <Text>Creator, {creator.role}</Text>
                                </Box>
                            </Flex>
                        )}
                        <Button onClick={handeleDeletPost} >X</Button>
                        <PopOptions post={post} />
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
                    <LikePostButton post={post} />
                    <Button onClick={() => router.push(`/post/${post._id}`)} type="button"
                        bg="button.100"
                        width="48%"
                        _hover={{
                            bg: "button.200",
                        }} leftIcon={<ChatIcon />}>
                        Comentar
                    </Button>
                </CardFooter>
            </Card>
        </VStack>
    );
}
