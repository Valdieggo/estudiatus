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
import {User} from "./User";


export default function Navbar() {
 

  return (
    <Flex bg="teal.500" p="4" color="white">
      
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


