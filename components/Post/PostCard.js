// PostCard.js
import { VStack, Link, Text, CardBody, IconButton, Box, Heading, Flex, Card, CardHeader, Image, CardFooter, Button, Avatar, Icon } from "@chakra-ui/react";
import { ChatIcon, ArrowUpIcon, DownloadIcon } from "@chakra-ui/icons";
import LikePostButton from "./LikePostButton";
import MenuPost from "./MenuPost";
import FavPostButton from "./FavPostButton";
import { formatDistanceToNow } from "date-fns";
import esLocale from "date-fns/locale/es";

export default function PostCard({ post }) {

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
                        <MenuPost post={post} />
                    </Flex>
                </CardHeader>
                <CardBody>
                    <Text>
                        {post.content}
                    </Text>
                </CardBody>
                {post.file && (
                    <>
                        <Box align="center">
                            {post.file.endsWith(".png") || post.file.endsWith(".jpg") ? (
                                <Image src={`/api/File/download/${post.file}`} alt="Imagen" />
                            ) : (
                                <Button
                                    w={"430px"}
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
                            )}
                        </Box>
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
