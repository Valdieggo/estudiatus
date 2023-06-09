import { Box, Stack, Link, Text } from '@chakra-ui/react'

const Sidebar = () => {
  return (
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
      </Stack>

      <Text fontSize="2xl" mt="5">
        Admin
      </Text>
      <Stack spacing="3">
        <Link href="/college">College</Link>
        </Stack>
    </Box>
  )
}

export default Sidebar
