import { VStack, Text, CardBody, IconButton, Box, Heading, Flex, Card, CardHeader, Image, CardFooter, Button, Avatar, Icon, Tag, TagLabel, TagCloseButton, HStack } from "@chakra-ui/react";
import { ChatIcon, DownloadIcon, ChevronDownIcon } from "@chakra-ui/icons";
import LikePostButton from "./LikePostButton";
import PopOptions from "./PopOptions";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState } from "react";
import axios from "axios";



export default function PostsCard({ post, setAllPost, allPosts }) {
    const { creator } = post;

    let isCreatorId = false;
    const { data: session, status } = useSession();
    if (session && creator && creator._id) {
        isCreatorId = session.user.id === creator._id;
    }

    const isAdmin = session?.user.role === "admin";

    const router = useRouter();

    const handleDeletePost = () => {
        if (isAdmin || isCreatorId) {
            axios.delete(`http://localhost:3000/api/post/delete/${post._id}`)
                .then(res => {
                    console.log(res.data.data);
                    setAllPost(allPosts.filter(post => post._id !== res.data.data._id));
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            console.log("No tienes los permisos necesarios.");
        }
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
                        {isAdmin || isCreatorId ? (
                            <Button onClick={handleDeletePost}>X</Button>
                        ) : null}
                        <PopOptions post={post} />
                    </Flex>
                </CardHeader>
                <CardBody>
                    <Text>
                        {post.content}
                    </Text>
                </CardBody>
                <Button as="a" href={`/api/File/download/${post.file}`}>
                    Ver Documento
                </Button>

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
