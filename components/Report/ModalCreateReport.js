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
    Text,
    Spinner,
    Stack,
    Grid
} from "@chakra-ui/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";



export default function ModalCreateReport({ isOpen, onClose, post }) {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("../api/report/create", {
                reportedUserId: post.creator._id,
                reportUserId: session.user.id,
                reason:data.reason,
                description: data.description,
                post: post._id,
            });
            setLoading(false);
            onClose();
        } catch (error) {
            setLoading(false);
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl" closeOnOverlayClick={false}>
            <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
            <ModalContent background="bg.100" color="white">
                <ModalHeader>Reportar usuario</ModalHeader>
                <ModalCloseButton background="red" />
                <ModalBody>
                    <Stack as="form" spacing={4} onSubmit={handleSubmit(onSubmit)}>
                        <Text fontWeight="bold">Usuario reportado:{post.creator.username}</Text>
                        <Grid templateColumns="auto 1fr" columnGap="50%">
                            <Text>{}</Text>
                            <Text>{}</Text>
                        </Grid>
                        <FormControl >
                            <FormLabel>Razon</FormLabel>
                            <Input type="reason" {...register("reason", {required: true})} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Descripcion</FormLabel>
                            <Textarea type="description" {...register("description", {required:true})} />
                        </FormControl>
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="red" mr={3} onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button colorScheme="green" onClick={handleSubmit(onSubmit)} isLoading={loading}>
                        Enviar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}