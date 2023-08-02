import {useSession} from "next-auth/react"
import { VStack, Text, CardBody, IconButton, Box, Heading, Flex, Card, CardHeader, Image, CardFooter, Button, Avatar, Icon } from "@chakra-ui/react";
import { ChatIcon, ArrowUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import LikePostButton from "./LikePostButton";
import PopOptions from "./PopOptions";
import {useDisclosure} from "@chakra-ui/react"
import {useState} from "react"
import axios from "axios"
import {Textarea, Spinner} from "@chakra-ui/react"
import {useRouter} from "next/router"
import {useEffect} from "react"

export default function CreatePost({ post ,setTitle,setContent}) {
    const {data: session, status} = useSession();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [post, setPost] = useState("");
    const [isAddingPost, setIsAddingPost] = useState(false);
    const router = useRouter();

    const handlePost = (e) => {
        setPost(e.target.value);
    }

    const handleAddPost = () => {
        if (status === "authenticated") {
            setIsAddingPost(true);
            axios.post(`http://localhost:3000/api/post/create/`, {
                title: title,
                content: content,
                creator: session.user.id,
            })
                .then((res) => {
                    setTitle("");
                    setContent("");
                    setPost((post) => [...post, res.data.data]);
                    setIsAddingPost(false);
                    router.push("/");
                }
                )
                .catch((err) => {
                    console.log(err);
                    setIsAddingPost(false);
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
                placeholder="Escribe un post..."
                value={post}
                onChange={handlePost}
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
            onClick={() => handleAddPost()}
            leftIcon={ isAddingPost ? <Spinner /> : <ChatIcon />}
            >
                Añadir post
            </Button>
            <LoginModal isOpen={isOpen} onClose={onClose} />
        </Box>
    );
}