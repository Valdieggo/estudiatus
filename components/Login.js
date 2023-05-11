// components/LoginForm.js
import { Box, Button, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/client";

const LoginForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/",
    });
  };

  return (
    <Box width="100%" maxWidth="500px" margin="auto">
      <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={6}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" {...register("email", { required: true })} />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type="password" {...register("password", { required: true })} />
        </FormControl>
        <Button type="submit" colorScheme="blue" width="100%">
          Sign In
        </Button>
      </VStack>
    </Box>
  );
};

export default LoginForm;