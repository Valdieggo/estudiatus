import { Flex, Box, Link, Spacer, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'

const Navbar = () => {
  return (
    <Flex bg="teal.500" p="4" color="white">
      <Box p="2">
        Nombre de la aplicación
      </Box>
      <Spacer />
      <Box>
        <Link px="4" href="/">Inicio</Link>
        <Link px="4" href="/about">Acerca de</Link>
        <Link px="4" href="/contact">Contacto</Link>
      </Box>
      <Spacer />
      <Box>
        <Menu>
          <MenuButton as="button">
            Usuario
          </MenuButton>
          <MenuList>
            <MenuItem>Perfil</MenuItem>
            <MenuItem>Configuración</MenuItem>
            <MenuItem>Salir</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  )
}

export default Navbar
