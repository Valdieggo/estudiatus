import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Heading,
    Text,
    FormControl,
    FormLabel,
    Input,
    VStack,
    Select,
    Button,
    useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function ModalSubjectRequest({
    isOpen,
    onClose,
    onOpen,
    careerId,
    collegeId,
}) {
    const { register, handleSubmit, reset } = useForm();
    const { data: session } = useSession();
    const toast = useToast();

    const submitRequest = async (data) => {
        const response = await axios.post("/api/subject_request/create", {
            subjectName: data.subjectName,
            college: collegeId,
            career: careerId,
            description: data.description,
            requestingUser: session.user.id,
        });

        if (response.status === 201) {
            onClose();
            toast({
                title: "Solicitud enviada",
                description: "Se ha enviado la solicitud correctamente",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            reset();
        } else {
            toast({
                title: "Error al enviar la solicitud",
                description: "No se ha podido enviar la solicitud",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="post.100">
                <ModalHeader mt="6" color="white" textAlign="center">
                    <Text>Solicitar nueva asignatura</Text>
                </ModalHeader>
                <ModalCloseButton color="white" />
                <ModalBody>
                    <VStack
                        as="form"
                        onSubmit={handleSubmit(submitRequest)}
                        pb="6"
                    >
                        <FormControl color={"white"}>
                            <FormLabel>Nombre de la asignatura</FormLabel>
                            <Input
                                type="text"
                                {...register("subjectName", { required: true })}
                            />
                        </FormControl>
                        <FormControl color={"white"} pb="6">
                            <FormLabel>Descripcion</FormLabel>
                            <Input
                                type="text"
                                {...register("description", { required: true })}
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            bg="button.100"
                            width="100%"
                            _hover={{
                                bg: "button.200",
                            }}
                        >
                            Enviar
                        </Button>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
