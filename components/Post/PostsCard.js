import {
    VStack,
    Text,
    CardBody,
    Box,
    Heading,
    Flex,
    Card,
    CardHeader,
    Image,
    CardFooter,
    Button,
    Avatar,
    Link,
    Tag
} from "@chakra-ui/react";
import {
    ChatIcon,
    DownloadIcon,
    ViewIcon
} from "@chakra-ui/icons";
import LikePostButton from "./LikePostButton";
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import FavPostButton from "./FavPostButton";
import MenuPost from "./MenuPost";
import esLocale from "date-fns/locale/es";
import ModalImg from "./ModalImg";

export default function PostsCard({ post, setAllPosts, allPosts, title, subjectId }) {
    const { creator } = post;

    const router = useRouter();
    const timeAgo = formatDistanceToNow(new Date(post.createDate), {
        addSuffix: true,
        locale: esLocale,
    });

    return (
        <VStack key={post.id} marginY={4} spacing={4} align="center">
            <Card color="white" width="100%" maxWidth="500px" margin="auto" bg="post.100" borderRadius="md" p={4}
                _hover={{
                    bg: "post.200",
                }}
            >
                <Box margin={"5"}>
                    <Text fontSize='3xl'>{post.title}</Text>
                </Box>
                <CardHeader>
                    <Flex spacing="4">
                        {post.creator && ( // Renderiza condicionalmente si post.creator está definido
                            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                                <Link href={`/profile/${post.creator._id}`}>
                                    <Flex direction='row' gap={4}>
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
                                </Link>
                                <Text>Publicado {timeAgo}</Text>
                            </Flex>
                        )}
                        <MenuPost
                            post={post}
                            setAllPosts={setAllPosts}
                            allPosts={allPosts}
                            subjectId={subjectId}
                        />
                        <FavPostButton post={post} />
                    </Flex>
                </CardHeader>
                <CardBody>
                    <Text>{post.content}</Text>
                </CardBody >
                {console.log(post)}
                {post.file && (
                    <>
                        <CardFooter
                            justify="space-between"
                            flexWrap="wrap"
                            sx={{
                                "& > button": {
                                    minW: "140px",
                                },
                            }}>
                            <Button
                                w={"205px"}
                                as="a"
                                bg="button.100"
                                _hover={{
                                    bg: "button.200",
                                }}
                                download={`/api/File/download/${post.file}`}
                                href={`/api/File/download/${post.file}`}
                                leftIcon={<DownloadIcon />}
                            >
                                Descargar Documento
                            </Button>

                            <Button
                                w={"205px"}
                                as="a"
                                bg="button.100"
                                _hover={{
                                    bg: "button.200",
                                }}
                                href={`/api/File/download/${post.file}`}
                                leftIcon={<ViewIcon />}
                            >
                                Ver Documento
                            </Button>
                        </CardFooter>
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
                    <LikePostButton post={post} isList={true} />
                    <Button onClick={() => router.push(`/post/${post._id}`)} type="button"
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
