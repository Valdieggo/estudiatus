import { Box, Stack, Link, Text, Flex } from "@chakra-ui/react";
import Administrator from "../Admin/Administrator";
import { Drawer } from "@chakra-ui/react";
const Sidebar = () => {
  /**
  * 
  *  return (
    <Box
      w="200px"
      h="100vh"
      position="fixed"
      top={0}
      left={0}
      bg="gray.800"
      color="white"
      p="5"
    >
      <Text fontSize="2xl" mb="5">
        Menú
      </Text>
      <Stack spacing="3">
        <Link href="/">Inicio</Link>
        <Link href="/about">Acerca de</Link>
        <Link href="/contact">Contacto</Link>
        <Link href="/college">Universidades con un titulo largo para ver que pasa</Link>

      </Stack>
      <Stack spacing="3">
      {Administrator()}
      </Stack>
    </Box>
  )
 return (
  <Drawer
  isOpen={true}
  placement="left"
  onClose={() => {}}
  size="xs"
  bg="gray.800"
  >
    <Box
      w="200px"
      h="100vh"
      top={0}
      left={0}
      bg="gray.800"
      color="white"
      p="5"
    >
       <Text fontSize="2xl" mb="5">
        Menú
      </Text>
      <Stack spacing="3">
        <Link href="/">Inicio</Link>
        <Link href="/about">Acerca de</Link>
        <Link href="/contact">Contacto</Link>
        <Link href="/college">Universidades con un titulo largo para ver que pasa</Link>

      </Stack>
      <Stack spacing="3">
      {Administrator()}
      </Stack>
    </Box>
  </Drawer>
  */

  return (
    <Box bg="gray.800" p="5" h="100vh" minW="20vh">
      <Stack spacing="3">
        <Link href="/">Inicio</Link>
        <Link href="/about">Acerca de</Link>
        <Link href="/contact">Contacto</Link>
        <Link href="/college/64c01fdb4f1783bb3dc306f2">Universidad Z</Link>
        <Link href="/subjectRequest">Solicitar asignatura</Link>
      </Stack>
      <Stack spacing="3">{Administrator()}</Stack>
    </Box>
  );
};

export default Sidebar;
