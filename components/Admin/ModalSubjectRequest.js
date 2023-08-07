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
import { useEffect, useState } from "react";
import axios from "axios";

export default function ModalSubjectRequest({
    isOpen,
    onClose,
    onOpen,
    subjectRequestId,
}) {
    const [subjectRequest, setSubjectRequest] = useState({});

    const getSubjectRequest = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/subject_request/getOne/${subjectRequestId}`
            );
            setSubjectRequest(response.data.data);
        } catch (error) {
            console.error("Error fetching subject request data:", error);
        }
    };

    useEffect(() => {
        getSubjectRequest();
    }, [subjectRequestId]);

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
                        <Text color="white">
                            Nombre : {subjectRequest.subjectName}
                        </Text>
                        <Text color="white">
                            Universidad : {subjectRequest.college}
                        </Text>
                        <Text color="white">
                            Carrera : {subjectRequest.career}
                        </Text>
                        <Text color="white">
                            Descripción : {subjectRequest.description}
                        </Text>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="red" mr={3} onClick={onClose}>
                        Rechazar
                    </Button>
                    <Button colorScheme="green">Crear</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
