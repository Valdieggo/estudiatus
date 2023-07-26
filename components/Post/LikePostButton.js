// LikePostButton.js
import { Button, Spinner } from "@chakra-ui/react";
import { ArrowUpIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useDisclosure } from '@chakra-ui/react'
import LoginModal from "../Auth/LoginModal.js";

export default function LikePostButton({ post }) {
    const { data: session, status } = useSession();
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likes.length);
    const [isLiking, setIsLiking] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        if (status === "authenticated") {
            const userId = session.user.id;
            const postId = post._id;
            axios.post("/api/post/getUserLike", { userId, postId })
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
            const postId = post._id;
            console.log(userId, postId);
            axios.put("/api/post/like", { userId, postId })
                .then((res) => {
                    const liked = res.data.data.includes(userId);
                    setIsLiked(liked);
                    // Increment or decrement the like count depending on if the post was liked or unliked
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
            width="48%"
            onClick={handleLike}
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

