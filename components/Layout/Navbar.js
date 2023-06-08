import {
  Flex,
  Box,
  Link,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
} from "@chakra-ui/react";
import User from "./User";


export default function Navbar() {
 

  return (
    <Flex bg="teal.500" p="4" color="white">
      
      <Spacer />
      <Box>
        <Link px="4" href="/">
          Foro
        </Link>
        <Link px="4" href="/about">
          Repositorio
        </Link>
        <Link px="4" href="/contact">
          Eventos
        </Link>
      </Box>
      <Spacer />
      <User />
    </Flex>
  );
};


