import { Box, Link, Card, CardBody, CardHeader, CardFooter, VStack, Text, Button, IconButton, Stack, Flex, Avatar, Heading } from "@chakra-ui/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import LikeCommentButton from "./LikeCommentButton";
import MenuComment from "./MenuComment";
import { ChatIcon } from "@chakra-ui/icons";

export default function CommentCard({ comment, setComments, comments }) {
    const { creator } = comment;

    const { data: session, status } = useSession();

    let isCreatorId = false;

    if (session) {
        isCreatorId = session.user.id === creator._id;
    }

    const handleReply = () => {
        console.log("Reply button clicked");
    };

    const handleEdit = () => {
        console.log("Edit button clicked");
    };

    return (
        <Card color="white" width="100%" maxWidth="475px" margin="auto" bg="post.100" borderRadius="md" p={4}
            _hover={{
                bg: "post.200",
            }} >
            <CardHeader >
                <Flex spacing='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Link href={`/profile/${creator.id}`}>
                            <Flex direction='row' gap={4}>
                            <Avatar name={creator.username} src='https://bit.ly/broken-link' bg='blue.700' color='white' />
                            <Box>
                                <Heading size='sm'>{creator.username}</Heading>
                                <Text>{creator.role} </Text>
                            </Box>
                            </Flex>
                        </Link>
                    </Flex>
                    <MenuComment comment={comment} comments={comments} setComments={setComments}/>
                </Flex>
            </CardHeader>
            <CardBody>
                <Text>
                    {comment.text}
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
                <LikeCommentButton comment = {comment} />
                {/*<Button type="button"
                    bg="button.100"
                    width="48%"
                    _hover={{
                        bg: "button.200",
                    }} leftIcon={<ChatIcon />}>
                    Responder
                </Button>*/}
            </CardFooter>
        </Card>
  );
}