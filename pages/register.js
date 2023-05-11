// pages/auth/register.js
import { Box } from "@chakra-ui/react";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <RegisterForm />
    </Box>
  );
};

export default Register;
