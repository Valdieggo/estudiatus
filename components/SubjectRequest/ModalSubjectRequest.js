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
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function ModalSubjectRequest({ isOpen, onClose, onOpen }) {
    const { register, handleSubmit, reset } = useForm();
    const [collegeList, setCollegeList] = useState([]);
    const [careerList, setCareerList] = useState([]);
    const { data: session } = useSession();
    const [selectedCollege, setSelectedCollege] = useState("");
    const toast = useToast();

    const submitRequest = async (data) => {
        const response = await axios.post("/api/subject_request/create", {
            subjectName: data.subjectName,
            college: data.college,
            career: data.career,
            description: data.description,
            requestingUser: session.user.id,
        });

        if (response.status === 201) {
            toast({
                title: "Solicitud enviada",
                description: "Se ha enviado la solicitud correctamente",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            reset();
            setSelectedCollege("");
        }
    };

    const handleCollege = async () => {
        const response = await axios.get(
            "/api/college/getAll"
        );
        const collegeList = response.data.data;
        setCollegeList(collegeList);
    };

    const handleCareer = async () => {
        const response = await axios.get(
            "/api/career/getAll"
        );
        const careerList = response.data.data;
        setCareerList(careerList);
    };

    useEffect(() => {
        handleCollege();
        handleCareer();
    }, []);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="post.100">
                <ModalHeader mt="6" color="white" textAlign="center">
                    <Text>Solicitar nueva asignatura</Text>
                </ModalHeader>
                <ModalCloseButton color="white" />
                <ModalBody>
                    <VStack as="form" onSubmit={handleSubmit(submitRequest)}>
                        <FormControl color={"white"}>
                            <FormLabel>Nombre de la asignatura</FormLabel>
                            <Input
                                type="text"
                                {...register("subjectName", { required: true })}
                            />
                        </FormControl>
                        <FormControl color={"white"}>
                            <FormLabel>Universidad</FormLabel>
                            <Select
                                placeholder="Selecciona una Universidad"
                                {...register("college", { required: true })}
                                value={selectedCollege}
                                onChange={(e) =>
                                    setSelectedCollege(e.target.value)
                                }
                            >
                                {collegeList.map((college) => (
                                    <option
                                        key={college._id}
                                        value={college._id}
                                    >
                                        {college.collegeName}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl color={"white"}>
                            <FormLabel>Carrera</FormLabel>
                            <Select
                                placeholder="Selecciona una carrera"
                                {...register("career", { required: true })}
                            >
                                {careerList
                                    .filter(
                                        (career) =>
                                            career.college === selectedCollege
                                    )
                                    .map((career) => (
                                        <option
                                            key={career._id}
                                            value={career._id}
                                        >
                                            {career.careerName}
                                        </option>
                                    ))}
                            </Select>
                        </FormControl>
                        <FormControl color={"white"}>
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
