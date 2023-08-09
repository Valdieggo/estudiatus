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
    useToast,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Upload from '../../components/File/Upload.js';
import { useRouter } from 'next/router';
import { AttachmentIcon } from '@chakra-ui/icons';

export default function ModalEditPost({ isOpen, onClose, onOpen, post, allPosts, setAllPosts, subjectId }) {
    const { creator } = post;
    const router = useRouter();

    let isCreatorId = false;

    const { data: session, status } = useSession();

    if (session && creator && creator._id) {
        isCreatorId = session.user.id === creator._id;
    }

    const isAdmin = session?.user.role === 'admin';
    const [isEditPost, setIsEditPost] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState('');

    const toast = useToast();

    useEffect(() => {
        if (isOpen) {
            setTitle(post.title);
            setContent(post.content);
        }
    }, [isOpen, post.title, post.content]);

    const handleUpdate = async () => {
        if (isAdmin || isCreatorId) {
            // Validate title and content
            if (title.length < 1 || content.length < 1) {
                // Show error toast for empty fields
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
                // Show error toast for title length
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
                // Show error toast for title length
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
            setIsEditPost(true);
            axios
                .put(`${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_PORT}/api/post/update`, {
                    id: post._id,
                    title: title,
                    content: content,
                    creator: post.creator._id,
                    subject: subjectId,
                    file: idfile,
                })
                .then((res) => {
                    console.log(res.data.data);
                    setAllPosts((prevPosts) =>
                        prevPosts.map((prevPost) =>
                            prevPost._id === res.data.data._id ? res.data.data : prevPost
                        )
                    );

                    // Show success toast
                    toast({
                        title: 'Publicación editada',
                        description: 'La publicación ha sido editada exitosamente.',
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                    });

                    setIsEditPost(false);
                    onClose();
                })
                .catch((err) => {
                    console.log(err);
                    setIsEditPost(false);

                    // Show error toast
                    toast({
                        title: 'Error al editar',
                        description: 'Ha ocurrido un error al intentar editar la publicación.',
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    });
                });
        } else {
            console.log('No tienes los permisos necesarios.');
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
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="post.100">
                <ModalHeader mt="6" color="white" textAlign="center">
                    ¿Quieres editar esta publicación?
                </ModalHeader>
                <ModalCloseButton color="white" />

                <Textarea
                    textColor={'white'}
                    placeholder="Escribe un Título"
                    value={title}
                    onChange={handlerTitle}
                    my={4}
                />
                <Textarea
                    textColor={'white'}
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

                <ModalFooter>
                    <Flex direction="row" w="full" justifyContent="center" alignItems="center" gap={2}>
                        <Button
                            color="white"
                            bg="button.100"
                            w="full"
                            onClick={onClose}
                            _hover={{
                                bg: 'button.200',
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            color="white"
                            bg="red.600"
                            w="full"
                            onClick={handleUpdate}
                            _hover={{
                                bg: 'cyan.200',
                            }}
                        >
                            Editar
                        </Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
