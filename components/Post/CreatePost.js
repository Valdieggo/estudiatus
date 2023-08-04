import {useSession} from "next-auth/react"
import { VStack, Text, CardBody, IconButton, Box, Card, CardHeader, Image, Button, useDisclosure } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import PopOptions from "./PopOptions";
import {useState} from "react"
import axios from "axios"
import {Textarea, Spinner} from "@chakra-ui/react"
import {useRouter} from "next/router"
import {useEffect} from "react"


export default function CreatePost({ subject }) {
    console.log(subject._id)
    const { data: session, status } = useSession();
    const [isAddingPost, setIsAddingPost] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [allPosts, setAllPosts] = useState(posts);

    const handleAddPost = () => {
        if (status === "authenticated") {
            setIsAddingPost(true);
            axios
            .post(`http://localhost:3000/api/post/create`, {
                title: title,
                content: content,
                creator: session.user.id,
                subject: subject._id,
            })
                .then((res) => {
                    setTitle("");
                    setContent("");
                    setAllPosts((prevPosts) => [...prevPosts, res.data.data]);
                    setIsAddingPost(false);
                    router.reload();
                })
                .catch((err) => {
                    console.log(err);
                    setIsAddingPost(false);
                });
        } else {
            onOpen();
        }
    };


    const handlerTitle = (e) => {
        setTitle(e.target.value);
        console.log(e.target.value)
    };

    const handlerContent = (e) => {
        setContent(e.target.value);
        console.log(e.target.value)
    };
    return (
        <Box
        color="white"
        width="100%"
        maxWidth="500px"
        margin="auto"
        bg="post.100"
        borderRadius="md"
        p={4}
        mt={4}
        _hover={{
            bg: "post.200",
        }}
    >
        <Textarea
            placeholder="Estibe un Titulo"
            value={title}
            onChange={handlerTitle}
            my={4}
        />
        <Textarea
            placeholder="Estibe tu contenido"
            value={content}
            onChange={handlerContent}
            my={4}
        />

        <Button
            type="button"
            bg="button.100"
            width="100%"
            isDisabled={isAddingPost}
            _hover={{
                bg: "button.200",
            }}
            onClick={handleAddPost}
            leftIcon={isAddingPost ? <Spinner /> : <ChatIcon />}
        >
            Publicar un post
        </Button>
        <LoginModal isOpen={isOpen} onClose={onClose} />
    </Box>
    );
}