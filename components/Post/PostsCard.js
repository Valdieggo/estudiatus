import { VStack, Text, CardBody, IconButton, Box, Heading, Flex, Card, CardHeader, Image, CardFooter, Button, Avatar, Icon, Tag, TagLabel, TagCloseButton, HStack } from "@chakra-ui/react";
import { ChatIcon, ArrowUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import LikePostButton from "./LikePostButton";

import { useRouter } from "next/router";
import axios from "axios";
import FavPostButton from "./FavPostButton";

export default function PostsCard({ post }) {
    const router = useRouter()
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
                                    name={post.creator.username}
                                    src="https://bit.ly/broken-link"
                                    bg="blue.700"
                                    color="white"
                                />
                                <Box>
                                    <Heading size="sm">{post.creator.username}</Heading>
                                    <Text>Creator, {post.creator.role}</Text>
                                </Box>
                            </Flex>
                        )}
                        <FavPostButton post={post} />
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
