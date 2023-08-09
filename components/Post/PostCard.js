import { VStack, Link, Text, CardBody, Box, Heading, Flex, Card, CardHeader, Image, CardFooter, Button, Avatar } from "@chakra-ui/react";
import { ViewIcon, DownloadIcon } from "@chakra-ui/icons";
import LikePostButton from "./LikePostButton";
import MenuPost from "./MenuPost";
import FavPostButton from "./FavPostButton";
import { formatDistanceToNow } from "date-fns";
import esLocale from "date-fns/locale/es";
import { useSession } from 'next-auth/react';
import ModalImg from "./ModalImg";

export default function PostCard({ post }) {
    const { data: session, status } = useSession();

    const timeAgo = formatDistanceToNow(new Date(post.createDate), {
        addSuffix: true,
        locale: esLocale,
    });

    return (
        <VStack spacing={4} align="center">
            <Card color="white" width="100%" margin="auto" bg="post.100" borderRadius="md" p={4}
                _hover={{
                    bg: "post.200",
                }} >
                <Box margin={"5"}>
                    <Text fontSize='3xl'>{post.title}</Text>
                </Box>
                <CardHeader >
                    <Flex spacing='4' justifyItems='between'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Link href={`/profile/${post.creator._id}`}>
                                <Flex direction='row' gap={4}>
                                    <Avatar name={post.creator.username} src='https://bit.ly/broken-link' bg='blue.700' color='white' />
                                    <Box>
                                        <Heading size='sm'>{post.creator.username}</Heading>
                                        <Text>{post.creator.role} </Text>
                                    </Box>
                                </Flex>
                            </Link>
                            <Text>Publicado {timeAgo}</Text>
                        </Flex>
                        <FavPostButton post={post} />
                        {status === "authenticated" ?
                            <MenuPost post={post} />
                            : null
                        }

                    </Flex>
                </CardHeader>
                <CardBody>
                    <Text>
                        {post.content}

                    </Text>
                </CardBody>
                {post.file && (
                    <>
                        {post.file.originalName.endsWith(".png") || post.file.originalName.endsWith(".jpg") || post.file.originalName.endsWith(".jpeg") || post.file.originalName.endsWith(".gif") ? (
                            <Box align={"center"}>
                                <ModalImg post={post} />
                            </Box>
                        ) : (
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
                                    download={`/api/File/download/${post.file._id}`}
                                    href={`/api/File/download/${post.file._id}`}
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
                                    href={`/api/File/download/${post.file._id}`}
                                    leftIcon={<ViewIcon />}
                                >
                                    Ver Documento
                                </Button>
                            </CardFooter>
                        )}
                    </>
                )}

                <CardFooter
                    justify='space-between'
                    flexWrap='wrap'
                    sx={{
                        '& > button': {
                            minW: '136px',
                        },
                    }}
                >
                    <LikePostButton post={post} isList={false} />
                    {/*<Button type="button"
                        bg="button.100"
                        width="48%"
                        _hover={{
                            bg: "button.200",
                        }} leftIcon={<ChatIcon />}>
                        Comentar
                    </Button>*/}
                </CardFooter>
            </Card>
        </VStack>
    );
}
