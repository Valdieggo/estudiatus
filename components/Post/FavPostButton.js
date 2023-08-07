import { IconButton } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useDisclosure } from '@chakra-ui/react'
import LoginModal from "../Auth/LoginModal.js";
import { BsBookmarkStar, BsBookmarkStarFill } from "react-icons/bs";

export default function FavPostButton({ post }) {
    const { data: session, status } = useSession();
    const [isFav, setIsFav] = useState(false);
    const [isFaving, setIsFaving] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()

    const buttonIcon = isFav ? <BsBookmarkStarFill /> : <BsBookmarkStar />;
    const handleFav = () => {
        if (status === "authenticated") {
            setIsFaving(true);
            const userId = session.user.id;
            const postId = post._id;
            axios.put("/api/user/fav", { userId, postId })
                .then((res) => {
                    const fav = res.data.data.includes(postId);
                    setIsFav(fav);
                    setIsFaving(false);
                })
                .catch((err) => {
                    console.log(err);
                    setIsFaving(false);
                });
        } else {
            onOpen();
        }
    }

    useEffect(() => {
        if (status === "authenticated") {
            const userId = session.user.id;
            const postId = post._id;
            axios.post("/api/user/getPostFav", { userId, postId })
                .then((res) => {
                    setIsFav(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [status]);

    return (
        <>
        <IconButton aria-label="añadir a favoritos" icon={buttonIcon} 
            bg="none" color="white" _hover={{ bg: "none" }}
            onClick={handleFav}
            isDisabled={isFaving}
        >
        </IconButton>
        <LoginModal isOpen={isOpen} onClose={onClose} />
        </>
    )
}