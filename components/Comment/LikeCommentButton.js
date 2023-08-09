// LikeCommentButton.js
import { Button, Spinner } from "@chakra-ui/react";
import { ArrowUpIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useDisclosure } from '@chakra-ui/react'
import LoginModal from "../Auth/LoginModal.js";

export default function LikeCommentButton({ comment }) {
    const { data: session, status } = useSession();
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(comment.likes.length);
    const [isLiking, setIsLiking] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        if (status === "authenticated") {
            const userId = session.user.id;
            const commentId = comment._id;
            axios.post("/api/comment/getUserLike", { userId, commentId })
                .then((res) => {
                    setIsLiked(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [status]);

    const handleLike = () => {
        if (status === "authenticated") {
            setIsLiking(true);
            const userId = session.user.id;
            const commentId = comment._id;
            axios.put("/api/comment/like", { userId, commentId })
                .then((res) => {
                    const liked = res.data.data.includes(userId);
                    setIsLiked(liked);
                    setLikeCount((prevCount) => prevCount + (liked ? 1 : -1));
                    setIsLiking(false);
                })
                .catch((err) => {
                    console.log(err);
                    setIsLiking(false);
                });
        } else {
            onOpen();
        }
    };

    const buttonColor = isLiked ? "button.200" : "button.100";

    return (
        <Button type="button"
            bg={buttonColor}
            onClick={handleLike}
            w="100%"
            isDisabled={isLiking}
            _hover={{
                bg: "button.200",
            }} 
            leftIcon={isLiking ? <Spinner /> : <ArrowUpIcon />}>
            Like {likeCount}
            <LoginModal isOpen={isOpen} onClose={onClose} />
        </Button>
    );
}

