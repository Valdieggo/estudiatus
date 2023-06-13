// pages/register.js
import {
  Box,
  Heading,
  Stack,
  Text,
  HStack,
  Flex,
} from "@chakra-ui/react";
import RegisterForm from "../components/Auth/RegisterForm";
import { Link } from '@chakra-ui/next-js'
import Layout from "../components/Auth/Layout";

const Register = () => {
  return (
    <Layout>
      <Flex direction="column" align="center" justify="center" minH="100vh">
        <Stack spacing="6" mt={8} maxWidth="450px" width="100%">
          <Stack
            spacing={{
              base: '2',
              md: '3',
            }}
            textAlign="center"
          >
            <Heading
              color="white"
              size={{
                base: 'xl',
                md: 'sm',
              }}
            >
              Bienvenido, registrate.
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color="white">Ya tienes una cuenta?</Text>
              <Link href='/login' color="button.100">
                Inicia sesión
              </Link>
            </HStack>
          </Stack>
          <Box
            py={{
              base: '0',
              sm: '8',
            }}
            px={{
              base: '4',
              sm: '10',
            }}
            bg="post.100"
            borderRadius={{
              base: 'none',
              sm: 'xl',
            }}
          >
            <RegisterForm />
          </Box>
        </Stack>
      </Flex>
    </Layout>
  );
};

export default Register;
