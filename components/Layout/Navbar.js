import { HStack, IconButton, Link, Image, Text, Flex, Menu, MenuButton, VStack, Avatar, Box, MenuList, MenuItem, MenuDivider } from "@chakra-ui/react";
import { FiMenu, FiBell, FiChevronDown } from "react-icons/fi";
import User from "./User"
export default function Navbar({ onOpen, ...rest }) {
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg="post.100"
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            {...rest}>
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                bg="post.200"
                color="white"
                _hover={{ bg: 'button.100' }}
                aria-label="open menu"
                icon={<FiMenu />}
            />
            <Link href="/" display={{ base: 'flex', md: 'none' }}>
              <Image src="/estudiatus.svg" alt="Logo Estudiatus" boxSize="50px" />
              <Text
                  ml={4}
                  fontSize="xl"
                  fontWeight="bold"
                  alignSelf={'center'}
                  >
                  Estudiatus
              </Text>
            </Link>
            

            <HStack spacing={{ base: '0', md: '6' }}>
                <Flex alignItems={'center'}>
                    <User />
                </Flex>
            </HStack>
        </Flex>
    );
}

// import { Flex, Image, Text, useColorModeValue, Avatar, Link } from '@chakra-ui/react';
// import User from './User';
// const Navbar = ({ user }) => (
//   <Flex align="center" justify="space-between" px={5} py={4} bg="post.100" pos="sticky" top="0" zIndex="10" w="100%" h="64px">
//     <Flex align="center">
//       <Link href="/">
//         <Image src="/estudiatus.svg" alt="Logo Estudiatus" boxSize="50px" />
//       </Link>
//       <Text ml={4} fontSize="xl" fontWeight="bold" color="white">
//         Estudiatus
//       </Text>
//     </Flex>
//     <User />
//   </Flex>
// );

// export default Navbar;