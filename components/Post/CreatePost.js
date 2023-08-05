import { useSession } from "next-auth/react"
import { VStack, Text, CardBody, IconButton, Box, Card, CardHeader, Image, Button, useDisclosure } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import PopOptions from "./PopOptions";
import { useState } from "react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { AttachmentIcon } from "@chakra-ui/icons";
import axios from "axios"
import { Textarea, Spinner } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect } from "react"
import LoginModal from "../Auth/LoginModal"


export default function CreatePost({ posts, subject }) {
    const { data: session, status } = useSession();
    const [isAddingPost, setIsAddingPost] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [allPosts, setAllPosts] = useState(posts);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleAddPost = async () => {
        if (status === "authenticated") {
            setIsAddingPost(true);

            try {
                const formData = new FormData();
                formData.append("file", selectedFile);
                formData.append("title", title);
                formData.append("content", content);
                formData.append("creator", session.user.id);
                formData.append("subject", subject._id);

                const response = await axios.post("/api/post/create", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                setTitle("");
                setContent("");
                setSelectedFile(null);
                setAllPosts((prevPosts) => [...prevPosts, response.data.data]);
                setIsAddingPost(false);
                router.reload();
            } catch (error) {
                console.log(error);
                setIsAddingPost(false);
            }
        } else {
            onOpen();
        }
    };

    const handlerTitle = (e) => {
        setTitle(e.target.value);
    };

    const handlerContent = (e) => {
        setContent(e.target.value);
    };

    const handleFileSelect = (e) => {
        setSelectedFile(e.target.files[0]);
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

            <InputGroup>
                <Input
                    type="file"
                    accept=".jpg, .jpeg, .png, .gif, .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt"
                    onChange={handleFileSelect}
                    display="none"
                />
                <Input
                    placeholder="Selecciona un archivo"
                    value={selectedFile ? selectedFile.name : ""}
                    readOnly
                    pr="4.5rem"
                    onClick={() => document.querySelector("input[type='file']").click()}
                />
                <InputRightElement width="4.5rem">
                    <AttachmentIcon color="gray.500" />
                </InputRightElement>
            </InputGroup>

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
                Publicar
            </Button>
            <LoginModal isOpen={isOpen} onClose={onClose} />
        </Box>
    );
}