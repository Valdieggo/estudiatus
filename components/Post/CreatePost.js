import { useSession } from 'next-auth/react';
import {
    VStack,
    Input,
    CardBody,
    IconButton,
    Box,
    Card,
    CardHeader,
    Image,
    Button,
    useDisclosure,
    useToast,
    Textarea,
    Spinner,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import { ChatIcon, AttachmentIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import LoginModal from '../Auth/LoginModal';
import Upload from '../../components/File/Upload.js';

export default function CreatePost({ allPosts, setAllPosts, subject }) {
    const { data: session, status } = useSession();
    const [isAddingPost, setIsAddingPost] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState('');

    const toast = useToast();

    const handleAddPost = async () => {
        if (status === 'authenticated') {
            // Validate title and content
            if (title.length < 1 || content.length < 1) {
                toast({
                    title: 'Campos vacíos',
                    description: 'El título y el contenido no pueden estar vacíos.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
                return;
            }
            if (title.length > 100) {
                toast({
                    title: 'Título demasiado largo',
                    description: 'El título no puede tener más de 100 caracteres.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
                return;
            }
            if (title.length < 5) {
                toast({
                    title: 'Título demasiado corto',
                    description: 'El título debe tener al menos 5 caracteres.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
                return;
            }

            const idfile = await Upload(file);
            setIsAddingPost(true);
            axios
                .post(`http://localhost:3000/api/post/create`, {
                    title: title,
                    content: content,
                    creator: session.user.id,
                    subject: subject._id,
                    file: idfile,
                })
                .then((res) => {
                    console.log(idfile);
                    setTitle('');
                    setContent('');
                    setFile('');
                    setAllPosts((allPosts) => [res.data.data, ...allPosts]);

                    // Show success toast
                    toast({
                        title: 'Publicación exitosa',
                        description: 'Tu publicación ha sido creada exitosamente.',
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                    });

                    setIsAddingPost(false);
                })
                .catch((err) => {
                    console.log(err);
                    setIsAddingPost(false);

                    // Show error toast
                    toast({
                        title: 'Error al publicar',
                        description: 'Ha ocurrido un error al intentar publicar.',
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    });
                });
        } else {
            onOpen();
        }
    };

    const handlerUpdate = (e) => {
        setFile(e.target.files[0]);
    };

    const handlerTitle = (e) => {
        setTitle(e.target.value);
    };

    const handlerContent = (e) => {
        setContent(e.target.value);
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
                bg: 'post.200',
            }}
        >
            <Textarea
                placeholder="Escribe un Título"
                value={title}
                onChange={handlerTitle}
                my={4}
            />
            <Textarea
                placeholder="Escribe tu contenido"
                value={content}
                onChange={handlerContent}
                my={4}
            />
             <InputGroup>
                <Input
                    type="file"
                    accept=".jpg, .jpeg, .png, .gif, .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt"
                    onChange={handlerUpdate}
                    display="none"
                />
                <Input
                    placeholder="Selecciona un archivo"
                    value={file ? file.name : ""}
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
                    bg: 'button.200',
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
