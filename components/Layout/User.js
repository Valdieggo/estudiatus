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
} from "@chakra-ui/react";

export default function User() {
    const { data: session, status } = useSession();
    if (status === "authenticated") {
        return (
            <Menu>
                <MenuButton
                    as="button"
                    color="post.200"
                    px="6"
                    py="3"
                    borderradius="full"
                    max-width="fit-content"
                    _hover={{
                        bg: "post.200",
                    }}
                >
                    <Flex alignItems="center">
                        <Avatar
                            size="sm"
                            mr="2"
                            name={session.user.username}
                            src={session.user.image}
                        />
                        <Text color="white"> {session.user.username} </Text>
                    </Flex>
                </MenuButton>

                <MenuList color="#67686B">
                    <MenuGroup color="#000">
                        <Link href={`/profile/${session.user.id}`} >
                            <MenuItem>
                                Perfil
                            </MenuItem>
                        </Link>
                        <MenuItem>Configuración</MenuItem>
                        <MenuItem>
                            <Link href="/appeals" w="full">Mis apelaciones</Link>
                        </MenuItem>
                    </MenuGroup>
                    <MenuDivider />
                    <MenuGroup color="#000">
                        <MenuItem
                            onClick={() => signOut({ callbackUrl: "/login" })}
                        >
                            Cerrar sesión
                        </MenuItem>
                    </MenuGroup>
                </MenuList>
            </Menu>
        );
    } else {
        return (
            <Link href="/login">
                <Box
                    bg="post.100"
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
