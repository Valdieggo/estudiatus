
import { Box } from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <LoginForm />
    </Box>
  );
};

export default Login;
