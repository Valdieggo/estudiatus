// components/LoginForm.js
import { Box, Button, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

const LoginForm = ( { callbackUrl } ) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  callbackUrl = callbackUrl || "/";

  const onSubmit = async (data) => {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: callbackUrl,
    });
  };

  return (
    <Box color="white" width="100%" maxWidth="500px" margin="auto">
      <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={6}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" {...register("email", { required: true })} />
          {errors.email && <span>This field is required</span>}
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type="password" {...register("password", { required: true })} />
        </FormControl>
        <Button 
          type="submit" 
          bg="button.100" 
          width="100%"
          _hover={
            {
              bg: "button.200",
            }
          }
          >
          Iniciar sesión
        </Button>
      </VStack>
    </Box>
  );
};

export default LoginForm;