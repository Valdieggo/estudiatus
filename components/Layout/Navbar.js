import {
  Flex,
  Box,
  Link,
} from "@chakra-ui/react";
import User from "./User";

export default function Navbar() {
  return (
    <Flex maxW="100%" p="4" justifyContent="space-between" zIndex="10">
      <Box />

      <Box>
        <Link px="4" href="/">
          Foro
        </Link>
<<<<<<< HEAD
        <Link px="4" href="/about">
          Repositorio
=======
        <Link px="4" href="/">
          Apuntes
>>>>>>> origin/profile
        </Link>
        <Link px="4" href="/contact">
          Eventos
        </Link>
      </Box>

      <User />
    </Flex>
  );
};
