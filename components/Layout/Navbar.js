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
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  
  return (
    <Flex bg="teal.500" p="4" color="white">
      <Box p="2">Nombre de la aplicación</Box>
      <Spacer />
      <Box>
        <Link px="4" href="/">
          Inicio
        </Link>
        <Link px="4" href="/about">
          Acerca de
        </Link>
        <Link px="4" href="/contact">
          Contacto
        </Link>
      </Box>
      <Spacer />
      <Box>
        <Menu>
          <MenuButton as="button">user</MenuButton>
          <MenuList color="#67686B">
            <MenuGroup title="Perfil" color="#000">
              <MenuItem>Perfil</MenuItem>
              <MenuItem>Configuración</MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title="Auth" color="#000">
              <MenuItem>Salir</MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default Navbar;
