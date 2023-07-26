import { useSession } from "next-auth/react";
import { Box, VStack, Text, Button, IconButton, Stack, Textarea, Spinner} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDisclosure } from '@chakra-ui/react'
import LoginModal from "../Auth/LoginModal.js";
import { set } from "mongoose";
import { ChatIcon } from "@chakra-ui/icons";

export default function AddCommentCard({ post, setComments, comments }) {
    const { data: session, status } = useSession();
    const [comment, setComment] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isAddingComment, setIsAddingComment] = useState(false);

    const handleComment = (e) => {
        setComment(e.target.value);
    }

    const handleAddComment = () => {
        if (status === "authenticated") {
            setIsAddingComment(true);
            axios.post(`http://localhost:3000/api/comment/add/`, {
                text: comment,
                postId: post._id,
                creator: session.user.id,
            })
                .then((res) => {
                    setComment("");
                    setComments((comments) => [...comments, res.data.data]);
                    setIsAddingComment(false);
                }
                )
                .catch((err) => {
                    console.log(err);
                    setIsAddingComment(false);
                }
                );
        } else {
            onOpen();
        }
    }

    return (
        <Box color="white" width="100%" maxWidth="500px" margin="auto" bg="post.100" borderRadius="md" p={4} mt={4}
        _hover={{
            bg: "post.200",
        }}
        >
            <Textarea 
                placeholder="Escribe un comentario..."
                value={comment}
                onChange={handleComment}
                my={4}
            />
            
            <Button
            type="button"
            bg="button.100"
            width="100%"
            isDisabled={isAddingComment}
            _hover={{
                bg: "button.200",
            }}
            onClick={() => handleAddComment()}
            leftIcon={ isAddingComment ? <Spinner /> : <ChatIcon />}
            >
                Añadir comentario
            </Button>
            <LoginModal isOpen={isOpen} onClose={onClose} />
        </Box>
    );

}



