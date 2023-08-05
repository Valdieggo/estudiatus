import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    VStack,
    Heading,
    Button,
} from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

export default function ModalSubjectRequest({
    isOpen,
    onClose,
    subjectRequestId,
}) {
    const displayData = async () => {
        const response = await axios.get(
            `http://localhost:3000/api/subject_request/getOne/${subjectRequestId}`
        );
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="post.100">
                <ModalHeader mt="6" color="white" textAlign="center">
                    Información
                </ModalHeader>
                <ModalCloseButton color="white" />
                <ModalBody>
                    <VStack mb="6" spacing="1">
                        <Text color="white">Nombre :</Text>
                        <Text color="white">Universidad :</Text>
                        <Text color="white">Carrera :</Text>
                        <Text color="white">Descripción :</Text>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="red" mr={3} onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button colorScheme="green">Enviar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
