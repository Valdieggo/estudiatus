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

export default function ModalSubjectRequestAdmin({
    isOpen,
    onClose,
    onOpen,
    subjectRequestId,
}) {
    const [subjectRequest, setSubjectRequest] = useState({});

    const getSubjectRequest = async () => {
        try {
            const response = await axios.get(
                `/api/subject_request/getOne/${subjectRequestId}`
            );
            setSubjectRequest(response.data.data);
        } catch (error) {
            console.error("Error fetching subject request data:", error);
        }
    };

    const handleReject = () => {
        console.log("Rechazar solicitud:", subjectRequestId);
        onClose();
    };

    const handleCreate = async () => {
        if (subjectRequest) {
            const response = await axios.post(`/api/subject/create`, {
                subjectName: subjectRequest.subjectName,
                career: subjectRequest.careerId,
                description: subjectRequest.description,
            });
            axios.delete(`/api/subject_request/delete/${subjectRequestId}`);
            onClose();
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
                <ModalFooter textAlign={"center"}>
                    <Button colorScheme="red" mr={3} onClick={handleReject}>
                        Rechazar
                    </Button>
                    <Button colorScheme="green" onClick={handleCreate}>
                        Crear
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
