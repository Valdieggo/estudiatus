import { Box, Text, Card, Flex, CardBody, Avatar, CardHeader, CardFooter, Heading, Button, VStack ,Tag} from '@chakra-ui/react';
import { ArrowUpIcon, ChatIcon } from '@chakra-ui/icons';
import Layout from '../components/Layout/Layout';

const Posts = ({ posts }) => {
    return (
        <Layout>
            <Box>
                <Text>Posts</Text>
                {posts.map((post) => (
                    <VStack key={post.id}>
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
                                    {post.creator && ( // Renderiza condicionalmente si post.creator está definido
                                        <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                                            <Avatar
                                                name={post.creator.username}
                                                src="https://bit.ly/broken-link"
                                                bg="blue.700"
                                                color="white"
                                            />                                            <Box>
                                                <Heading size="sm">{post.creator.username}</Heading>
                                                <Text>Creator, {post.creator.role}</Text>
                                            </Box>
                                        </Flex>
                                    )}
                                </Flex>
                            </CardHeader>
                            <CardBody>
                                <Text>{post.title}</Text>
                            </CardBody>
                            <CardBody>
                                <Text>{post.content}</Text>
                            </CardBody>
                            <CardFooter
                                justify="space-between"
                                flexWrap="wrap"
                                sx={{
                                    "& > button": {
                                        minW: "136px",
                                    },
                                }}
                            >
                                <Button
                                    type="button"
                                    bg="button.100"
                                    width="48%"
                                    _hover={{
                                        bg: "button.200",
                                    }}
                                    leftIcon={<ArrowUpIcon />}
                                >
                                    Like
                                </Button>
                                <Button
                                    type="button"
                                    bg="button.100"
                                    width="48%"
                                    _hover={{
                                        bg: "button.200",
                                    }}
                                    leftIcon={<ChatIcon />}
                                >
                                    Comment
                                </Button>
                            </CardFooter>
                        </Card>
                    </VStack>
                ))}
            </Box>
        </Layout>
    );
};

export default Posts;

export async function getStaticProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_PORT}/api/post/getAll`);
    const data = await res.json();
    if (res.status === 400) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            posts: data.data,
        },
    };
}
