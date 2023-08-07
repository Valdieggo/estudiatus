import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalCloseButton,
    Button,
    Flex,
    Textarea,
    Input,
} from '@chakra-ui/react'
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react'; // Importamos useEffect
import Upload from '../../components/File/Upload.js';
import { useRouter } from 'next/router';

export default function ModalEditPost({ isOpen, onClose, onOpen, post, allPosts, setAllPosts, subjectId }) {
    const { creator } = post;
    const router = useRouter()

    let isCreatorId = false;

    const { data: session, status } = useSession();

    if (session && creator && creator._id) {
        isCreatorId = session.user.id === creator._id;
    }

    const isAdmin = session?.user.role === "admin";
    const [isEditPost, setIsEditPost] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [file, setFile] = useState("");

    useEffect(() => {
        if (isOpen) { // Cuando el modal se abre, establecemos los valores iniciales de los campos
            setTitle(post.title);
            setContent(post.content);
        }
    }, [isOpen, post.title, post.content]);

    const handleUpdate = async () => {
        const idfile = await Upload(file);

        if (isAdmin || isCreatorId) {
            setIsEditPost(true);
            axios.put(`http://localhost:3000/api/post/update`, {
                id: post._id,
                title: title,
                content: content,
                creator: post.creator._id,
                subject: subjectId,
                file: idfile,
            })
                .then((res) => {
                    console.log(res.data.data);
                    setAllPosts(prevPosts => prevPosts.map(prevPost => prevPost._id === res.data.data._id ? res.data.data : prevPost));
                    setIsEditPost(false);
                    onClose();
                })
                .catch((err) => {
                    console.log(err)
                    setIsEditPost(false);
                });
        } else {
            console.log("No tienes los permisos necesarios.");
        }
    }

    const handlerUpdate = (e) => {
        setFile(e.target.files[0]);
    }

    const handlerTitle = (e) => {
        setTitle(e.target.value);
    };

    const handlerContent = (e) => {
        setContent(e.target.value);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="post.100">
                <ModalHeader mt="6" color="white" textAlign="center">
                    Quieres editar esta publicacion?
                </ModalHeader>
                <ModalCloseButton color="white" />

                <Textarea
                    textColor={"white"}
                    placeholder="Escribe un Titulo"
                    value={title}
                    onChange={handlerTitle}
                    my={4}
                />
                <Textarea
                    textColor={"white"}
                    placeholder="Escribe tu contenido"
                    value={content}
                    onChange={handlerContent}
                    my={4}
                />
                <Input placeholder="Image" type="file" onChange={handlerUpdate} accept=".jpg, .jpeg, .png, .gif, .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt"
                />

                <ModalFooter>
                    <Flex direction="row" w="full" justifyContent="center" alignItems="center" gap={2}>
                        <Button color="white" bg="button.100" w="full"
                            onClick={onClose}
                            _hover={{
                                bg: "button.200",
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button color="white" bg="red.600" w="full"
                            onClick={handleUpdate}
                            _hover={{
                                bg: "cyan.200",
                            }}
                        >
                            Editar
                        </Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
