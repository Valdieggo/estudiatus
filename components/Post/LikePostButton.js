// LikePostButton.js
import { Button } from "@chakra-ui/react";
import { ArrowUpIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useDisclosure } from '@chakra-ui/react'
import LoginModal from "../Auth/LoginModal.js";

export default function LikePostButton( { post } ) {
    const { data: session, status } = useSession();
    const [isLiked, setIsLiked] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        if(status === "authenticated") {
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
        if(status === "authenticated") {
            const userId = session.user.id;
            const postId = post._id;
            console.log(userId, postId);
            axios.put("/api/post/like", { userId, postId })
                .then((res) => {
                    setIsLiked(res.data.data.includes(userId));
                })
                .catch((err) => {
                    console.log(err);
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
            _hover={{
                bg: "button.200",
            }} leftIcon={<ArrowUpIcon />}>
            Like
            <LoginModal isOpen={isOpen} onClose={onClose} />
        </Button>
        
    );
}
