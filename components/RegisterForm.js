// components/RegisterForm.js
import { Box, Button, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";
import { hashPassword } from "../utils/auth";

const RegisterForm = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    const hashedPassword = await hashPassword(data.password);

    try {
      await axios.post("/api/auth/register", {
        username: data.username,
        birthday: data.birthday,
        email: data.email,
        password: hashedPassword,
      });

      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box width="100%" maxWidth="500px" margin="auto">
      <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={6}>
      <FormControl>
            <FormLabel>Username</FormLabel>
            <Input type="username" {...register("username", { required: true })} />
        </FormControl>
        <FormControl>
            <FormLabel>Birthday</FormLabel>
            <Input type="date" {...register("birthday", { required: true })} />
        </FormControl>
        <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" {...register("email", { required: true })} />
        </FormControl>
        <FormControl>
        <FormLabel>Password</FormLabel>
        <Input type="password" {...register("password", { required: true })} />
        </FormControl>
        <Button type="submit" colorScheme="blue" width="100%">
            Register
        </Button>
      </VStack>
    </Box>
    );
};

export default RegisterForm;