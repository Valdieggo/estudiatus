// PostCard.js
import { VStack, Text, CardBody, IconButton, Box, Heading, Flex, Card, CardHeader, Image, CardFooter, Button, Avatar, Icon } from "@chakra-ui/react";
import { ChatIcon, ArrowUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import LikePostButton from "./LikePostButton";
import PopOptions from "./PopOptions";
export default function PostsCard({ post }) {
    return (

        <VStack key={post.id} spacing={4} align="center">
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
                    <Button type="button"
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
