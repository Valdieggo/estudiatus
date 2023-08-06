import {
    VStack,
    Text,
    CardBody,
    IconButton,
    Box,
    Heading,
    Flex,
    Card,
    CardHeader,
    Image,
    CardFooter,
    Button,
    Avatar,
    Icon,
    Tag,
    TagLabel,
    TagCloseButton,
    HStack,
} from "@chakra-ui/react";
import {
    ChatIcon,
    DownloadIcon,
    ChevronDownIcon,
    ViewIcon,  // Importa el ícono para ver
} from "@chakra-ui/icons";
import LikePostButton from "./LikePostButton";
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState } from "react";
import axios from "axios";
import FavPostButton from "./FavPostButton";
import MenuPost from "./MenuPost";
import esLocale from "date-fns/locale/es";

export default function PostsCard({ post, setAllPosts, allPosts }) {
    const { creator } = post;

    let isCreatorId = false;
    const { data: session, status } = useSession();
    if (session && creator && creator._id) {
        isCreatorId = session.user.id === creator._id;
    }

    const isAdmin = session?.user.role === "admin";

    const handleDeletePost = () => {
        if (isAdmin || isCreatorId) {
            axios
                .delete(`http://localhost:3000/api/post/delete/${post._id}`)
                .then((res) => {
                    console.log(res.data.data);
                    setAllPosts(allPosts.filter((post) => post._id !== res.data.data._id));
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            console.log("No tienes los permisos necesarios.");
        }
    };

    const router = useRouter();
    const timeAgo = formatDistanceToNow(new Date(post.createDate), {
        addSuffix: true,
        locale: esLocale,
    });

    return (
        <VStack key={post.id} margin={"5"} spacing={4} align="center">
            <Card
                color="white"
                width="100%"
                maxWidth="500px"
                margin="auto"
                bg="post.100"
                borderRadius="md"
                p={4}
                _hover={{
                    bg: "post.200",
                }}
            >
                <CardHeader>
                    <Flex spacing="4">
                        {post.creator && (
                            <Flex
                                flex="1"
                                gap="4"
                                alignItems="center"
                                flexWrap="wrap"
                            >
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
                                <p>Creado: {timeAgo} </p>
                            </Flex>
                        )}
                        <MenuPost
                            post={post}
                            setAllPosts={setAllPosts}
                            allPosts={allPosts}
                        />
                        <FavPostButton post={post} />
                    </Flex>
                </CardHeader>
                <CardBody>
                    <Text>{post.content}</Text>
                </CardBody>
                {post.file && ( // Verifica si post.file está definido
                    <>
                        {post.file.endsWith(".png") || post.file.endsWith(".jpg") ? (
                            <Image src={`/api/File/download/${post.file}`} alt="Imagen" />
                        ) : (
                            <Button
                                as="a"
                                download={`/api/File/download/${post.file}`}
                                href={`/api/File/download/${post.file}`}
                                leftIcon={<DownloadIcon />}
                            >
                                Ver Documento
                            </Button>
                        )}
                    </>
                )}

                <CardFooter
                    justify="space-between"
                    flexWrap="wrap"
                    sx={{
                        "& > button": {
                            minW: "136px",
                        },
                    }}
                >
                    <LikePostButton post={post} />
                    <Button
                        onClick={() => router.push(`/post/${post._id}`)}
                        type="button"
                        bg="button.100"
                        width="48%"
                        _hover={{
                            bg: "button.200",
                        }}
                        leftIcon={<ChatIcon />}
                    >
                        Comentar
                    </Button>
                </CardFooter>
            </Card>
        </VStack>
    );
}
