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
    const [buttonsDisabled, setButtonsDisabled] = useState(false); // Estado para deshabilitar los botones

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
        if (subjectRequest && !buttonsDisabled) {
            // Verifica si los botones ya están deshabilitados
            try {
                setButtonsDisabled(true); // Deshabilita los botones
                const response = await axios.post(`/api/subject/create`, {
                    subjectName: subjectRequest.subjectName,
                    career: subjectRequest.careerId,
                    description: subjectRequest.description,
                });
                await axios.put(`/api/subject_request/update/`, {
                    id: subjectRequestId,
                    status: "Aceptada",
                });
                onClose();
            } catch (error) {
                console.error("Error creating subject:", error);
            } finally {
                setButtonsDisabled(false); // Habilita los botones nuevamente
            }
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
                    <Button
                        colorScheme="red"
                        mr={3}
                        onClick={handleReject}
                        isDisabled={buttonsDisabled}
                    >
                        Rechazar
                    </Button>
                    <Button
                        colorScheme="green"
                        onClick={handleCreate}
                        isD
                        isabled={buttonsDisabled}
                    >
                        Crear
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
