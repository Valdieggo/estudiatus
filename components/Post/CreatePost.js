import {useSession} from "next-auth/react"
import { VStack, Text, CardBody, IconButton, Box, Heading, Flex, Card, CardHeader, Image, CardFooter, Button, Avatar, Icon } from "@chakra-ui/react";
import { ChatIcon, ArrowUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import LikePostButton from "./LikePostButton";
import PopOptions from "./PopOptions";
import {useDisclosure} from "@chakra-ui/react"
import LoginModal from "../LoginModal";
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
            axios.post(`http://localhost:3000/api/post/add/`, {
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

    );
}