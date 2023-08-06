// PostCard.js
import { VStack, Link, Text, CardBody, IconButton, Box, Heading, Flex, Card, CardHeader, Image, CardFooter, Button, Avatar, Icon } from "@chakra-ui/react";
import { ChatIcon, ArrowUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import LikePostButton from "./LikePostButton";
import MenuPost from "./MenuPost";
import FavPostButton from "./FavPostButton";

export default function PostCard({ post }) {
    return (
        <VStack spacing={4} align="center">
            <Card color="white" width="100%" margin="auto" bg="post.100" borderRadius="md" p={4}
                _hover={{
                    bg: "post.200",
                }} >
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

                <CardFooter
                    justify='space-between'
                    flexWrap='wrap'
                    sx={{
                        '& > button': {
                            minW: '136px',
                        },
                    }}
                >
                    <LikePostButton post = {post} isList={false}/>
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
