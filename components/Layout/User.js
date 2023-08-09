import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import {
    Flex,
    Box,
    Spacer,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuGroup,
    MenuDivider,
    Text,
    Avatar,
    VStack,
    useColorModeValue
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";

export default function User() {
    const { data: session, status } = useSession();

    if (status === "authenticated") {
        return (
            <Menu>
                <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                    <Flex alignItems="center">
                        <Avatar
                            size="sm"
                            name={session.user.username}
                            src={session.user.image}
                        />
                        <VStack
                            display={{ base: 'none', md: 'flex' }}
                            alignItems="flex-start"
                            spacing="1px"
                            ml={2}
                            mr={2}>
                            <Text fontSize="md">{session.user.username}</Text>
                        </VStack>
                        <Box display={{ base: 'none', md: 'flex' }}>
                            <FiChevronDown />
                        </Box>
                    </Flex>
                </MenuButton>

                <MenuList
                    bg={useColorModeValue('white', 'gray.900')}
                    textColor="bg.100"
                >
                    <Link href={`/profile/${session.user.id}`} passHref>
                        <MenuItem>
                            Perfil
                        </MenuItem>
                    </Link>

                    <MenuDivider />
                    <MenuItem
                        onClick={() => signOut({ callbackUrl: "/login" })}
                    >
                        Cerrar sesión
                    </MenuItem>
                </MenuList>
            </Menu>
        );
    } else {
        return (
            <Link href="/login" passHref>
                <Box
                    px="6"
                    py="3"
                    borderRadius="full"
                    maxW="fit-content"
                    _hover={{
                        bg: "post.200",
                    }}
                >
                    <Text color="white"> Iniciar sesión </Text>
                </Box>
            </Link>
        );
    }
}
