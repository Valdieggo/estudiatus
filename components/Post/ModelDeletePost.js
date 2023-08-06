import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalCloseButton,
    Button,
    Flex,
} from '@chakra-ui/react'
import axios from 'axios';
import { useSession } from 'next-auth/react';
export default function ModalDeletePost({ isOpen, onClose, onOpen, post, allPosts, setAllPosts }) {
    
    const { creator } = post;

    let isCreatorId = false;
    const { data: session, status } = useSession();
    if (session && creator && creator._id) {
        isCreatorId = session.user.id === creator._id;
    }

    const isAdmin = session?.user.role === "admin";

    const handleDeletePost = () => {
        if (isAdmin || isCreatorId) {
            axios.delete(`http://localhost:3000/api/post/delete/${post._id}`)
                .then(res => {
                    console.log(res.data.data);
                    setAllPosts(allPosts.filter(post => post._id !== res.data.data._id));
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            console.log("No tienes los permisos necesarios.");
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="post.100">
                <ModalHeader mt="6" color="white" textAlign="center">
                    Quieres eliminar este comentario?
                </ModalHeader>
                <ModalCloseButton color="white" />

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
                            onClick={handleDeletePost}
                            _hover={{
                                bg: "red.400",
                            }}
                        >
                            Eliminar
                        </Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
