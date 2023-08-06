import Layout from "../components/Layout/Layout";
import {
    Box,
    Text,
    FormControl,
    FormLabel,
    Input,
    VStack,
    Select,
    Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function SubjectRequest() {
    const { register, handleSubmit } = useForm();
    const [collegeList, setCollegeList] = useState([]);
    const [careerList, setCareerList] = useState([]);
    const { data: session } = useSession();

    const submitRequest = (data) => {
        console.log("register:", data.subjectName);
        const response = axios.post("../api/subject_request/create", {
            subjectName: data.subjectName,
            college: data.college,
            career: data.career,
            description: data.description,
            requestingUser: session.user.id,
        });
    };

    const handleCollege = async () => {
        const response = await axios.get(
            "http://localhost:3000/api/college/getAll"
        );
        const collegeList = response.data.data;
        setCollegeList(collegeList);
    };

    const handleCareer = async () => {
        const response = await axios.get(
            "http://localhost:3000/api/career/getAll"
        );
        const careerList = response.data.data;
        setCareerList(careerList);
    };

    useEffect(() => {
        handleCollege();
        handleCareer();
    }, []);

    return (
        <Layout>
            <Box direction="column" align="center" pb={20}>
                <Text>Solicitar nueva asignatura</Text>
            </Box>
            <Box
                p={7}
                maxWidth="500px"
                borderWidth={1}
                borderRadius={8}
                mx={"auto"}
            >
                <VStack as="form" onSubmit={handleSubmit(submitRequest)}>
                    <FormControl>
                        <FormLabel>Nombre de la asignatura</FormLabel>
                        <Input
                            type="text"
                            {...register("subjectName", { required: true })}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Universidad</FormLabel>
                        <Select
                            placeholder="Selecciona una Universidad"
                            {...register("college", { required: true })}
                        >
                            {collegeList.map((college) => (
                                <option key={college._id} value={college._id}>
                                    {college.collegeName}
                                </option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Carrera</FormLabel>
                        <Select
                            placeholder="Selecciona una carrera"
                            {...register("career", { required: true })}
                        >
                            {careerList.map((career) => (
                                <option key={career._id} value={career._id}>
                                    {career.careerName}
                                </option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
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
            </Box>
        </Layout>
    );
}
