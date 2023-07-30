//  Este componente consiste en un boton que al ser presionado abre un modal para crear un reporte
//  El modal tiene un formulario que al ser completado y enviado crea un reporte en la base de datos
import React, { useEffect, useState } from "react";
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    useToast,
    useDisclosure,
    Text,
    Spinner,
    Grid,
    Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function ModalCreateReport({
    isOpen,
    onClose,
    reportedUser,
    postId,
}) {
    const { data: session, status } = useSession();
    const [reason, setReason] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const handleReasonChange = (event) => {
        setReason(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        console.log("reportUser: " + session.user.id);
        try {
            const response = await axios.post("../api/report/create", {
                reportedUserId: reportedUser._id,
                reportUserId: session.user.id,
                reason,
                description,
                post: postId,
            });
            console.log(response.data);
            setLoading(false);
            onClose();
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="xl"
            closeOnOverlayClick={false}
        >
            <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
            <ModalContent background="bg.100" color="white">
                <ModalHeader>Reportar usuario</ModalHeader>
                <ModalCloseButton background="red" />
                <ModalBody>
                    <Stack spacing={4}>
                        <Text fontWeight="bold">
                            Usuario reportado:{reportedUser.username}
                        </Text>
                        <Grid templateColumns="auto 1fr" columnGap="50%">
                            <Text>{}</Text>
                            <Text>{}</Text>
                        </Grid>
                        <FormControl id="reason">
                            <FormLabel>Razon</FormLabel>
                            <Input
                                type="text"
                                value={reason}
                                onChange={handleReasonChange}
                            />
                        </FormControl>
                        <FormControl id="description">
                            <FormLabel>Descripcion</FormLabel>
                            <Textarea
                                value={description}
                                onChange={handleDescriptionChange}
                            />
                        </FormControl>
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="red" mr={3} onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button
                        colorScheme="green"
                        onClick={handleSubmit}
                        isLoading={loading}
                    >
                        Enviar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
