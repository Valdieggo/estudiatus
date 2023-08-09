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
    Grid,
    Select,
    useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";



export default function ModalCreateReport({ isOpen, onClose, post }) {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("../api/report/create", {
                reportedUserId: post.creator._id,
                reportUserId: session.user.id,
                reason:data.reason,
                description: data.description,
                post: post._id,
            }).then((res) => {
                if (res.status === 201) {
                    toast({
                        title: "Reporte enviado",
                        description: "El reporte ha sido enviado exitosamente.",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                    });
                }

                setLoading(false);
                onClose();
            }).catch((err) => {
                console.log(err);
                toast({
                    title: "Error al enviar el reporte",
                    description: "Ha ocurrido un error al intentar enviar el reporte.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });

                setLoading(false);
            });

        } catch (error) {
            setLoading(false);
        }
    }
    const listSelect = [
        { value: "spam", label: "Spam" },
        { value: "insult", label: "Insulto" },
        { value: "inappropriate", label: "Inapropiado" },
        { value: "other", label: "Otro" },
    ];


    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl" closeOnOverlayClick={false}>
            <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
            <ModalContent background="bg.100" color="white">
                <ModalHeader>Reportar usuario</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack as="form" spacing={4} onSubmit={handleSubmit(onSubmit)}>
                        <Text fontWeight="bold">Usuario reportado:{post.creator.username}</Text>
                        <Grid templateColumns="auto 1fr" columnGap="50%">
                            <Text>{}</Text>
                            <Text>{}</Text>
                        </Grid>
                        <FormControl >
                            <FormLabel>Razon</FormLabel>
                            <Select type="reason" {...register("reason", {required:true})}>
                                {listSelect.map((option) => (
                                    <option style={{ color: 'black' }} key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </Select>
                            { errors.reason && <Text color="red">Este campo es requerido</Text>}
                        </FormControl>
                        <FormControl>
                            <FormLabel>Descripcion</FormLabel>
                            <Textarea type="description" {...register("description", {required:true , minLength : 10})} />
                            { errors.description && <Text color="red">Este campo es requerido, minimo 15 caracteres </Text>}
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