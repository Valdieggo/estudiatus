import { useSession } from "next-auth/react";
import { Box, VStack, Text, Button, IconButton, Stack, Textarea, Spinner} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDisclosure } from '@chakra-ui/react'
import LoginModal from "../Auth/LoginModal.js";
import { set } from "mongoose";
import { ChatIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";

export default function AddCommentCard({ post, setComments, comments }) {
    const { data: session, status } = useSession();
    const [comment, setComment] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isAddingComment, setIsAddingComment] = useState(false);
    const { register, reset, handleSubmit, formState: { errors } } = useForm();


    const onSubmit = data => {
        if (status === "authenticated") {
            setIsAddingComment(true);
            axios.post(`/api/comment/add/`, {
                text: data.comment,
                postId: post._id,
                creator: session.user.id,
            })
                .then((res) => {
                    reset();  // reset form fields
                    setComments((comments) => [...comments, res.data.data]);
                    setIsAddingComment(false);
                })
                .catch((err) => {
                    console.log(err);
                    setIsAddingComment(false);
                });
        } else {
            onOpen();
        }
    };

    return (
        <Box color="white" width="100%" maxWidth="500px" margin="auto" bg="post.100" borderRadius="md" p={4}
        _hover={{
            bg: "post.200",
        }}
        as="form" onSubmit={handleSubmit(onSubmit)}
        >
            <Textarea 
                placeholder="Escribe un comentario..."
                {...register("comment", {
                    required: "Debes escribir un comentario", 
                    minLength: { value: 10, message: "El comentario debe tener al menos 10 caracteres" },
                    maxLength: { value: 200, message: "El comentario debe tener menos de 200 caracteres" },
                })}
                mb={4}
            />
            {errors.comment && <Text mb={4} color="red.500">{errors.comment.message}</Text>}
            <Button
            type="submit"
            bg="button.100"
            width="100%"
            isDisabled={isAddingComment}
            _hover={{
                bg: "button.200",
            }}
            leftIcon={ isAddingComment ? <Spinner /> : <ChatIcon />}
            >
                Añadir comentario
            </Button>
            <LoginModal isOpen={isOpen} onClose={onClose} />
        </Box>
    );

}



