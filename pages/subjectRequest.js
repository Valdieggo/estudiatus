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
//import axios from "axios";

export default function SubjectRequest() {
    const { register, handleSubmit } = useForm();

    const submitRequest = () => {};

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
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Carrera</FormLabel>
                        <Select
                            placeholder="Selecciona una carrera"
                            {...register("career", { required: true })}
                        >
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
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
