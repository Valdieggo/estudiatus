import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
      HStack,
      Heading,
      Button,
      Flex,
  } from '@chakra-ui/react'
import axios from 'axios';
  export default function ModalDeleteComment({ isOpen, onClose, onOpen, comment, comments, setComments }) {

    const handleDelete = () => {
        axios.delete(`/api/comment/delete/${comment._id}`)
            .then((res) => {
                setComments(comments.filter((comment) => comment._id !== res.data.data));
                onClose();
            }
        )
        .catch((err) => {
            console.log(err);
        }
        );
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="post.100">
                <ModalHeader mt="6" color="white" textAlign="center">
                    Quieres eliminar este comentario?
                </ModalHeader>
                <ModalCloseButton color="white"/>

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
                            onClick={handleDelete}
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
