import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  Flex,
} from '@chakra-ui/react'

import LoginForm from "../components/Auth/LoginForm";
import { Link } from '@chakra-ui/next-js'
import Layout from '../components/Auth/Layout';

const Login = () => {
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
              Bienvenido, inicia sesión.
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color="white">No tienes una cuenta?</Text>
              <Link href='/register' color="button.100">
                Registrate
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
            <LoginForm />
          </Box>
        </Stack>
      </Flex>
    </Layout>
  );
};

export default Login;
