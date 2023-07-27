import { Flex, Image, Text, useColorModeValue, Avatar } from '@chakra-ui/react';
import User from './User';
const Navbar = ({ user }) => (
  <Flex align="center" justify="space-between" px={5} py={4} bg="post.100" pos="sticky" top="0" zIndex="10" w="100%" h="64px">
    <Flex align="center">
      <Image src="/estudiatus.svg" alt="Logo Estudiatus" boxSize="50px" />
      <Text ml={4} fontSize="xl" fontWeight="bold" color="white">
        Estudiatus
      </Text>
    </Flex>
    <User />
  </Flex>
);

export default Navbar;