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

export default function SubjectRequest() {
  const { register, handleSubmit } = useForm();
  const submitRequest = () => {
    console.log("hola");
  };

  return (
    <Layout>
      <Box direction="column" align="center">
        <Text>Solicitar nueva asignatura</Text>
      </Box>
      <VStack
        as="form"
        onSubmit={handleSubmit(submitRequest)}
        pr={100}
        pl={100}
      >
        <FormControl pt={20}>
          <FormLabel>Nombre de la asignatura</FormLabel>
          <Input type="text" {...register("subjectName", { required: true })} />
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
          <Input type="text" {...register("description", { required: true })} />
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
    </Layout>
  );
}
