import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import Link from "next/link"
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
} from "@chakra-ui/react";

export default function User() {
    const { data: session, status } = useSession()
    console.log(status)
    return (
      <Box>
        {
          status === "authenticated" ? 
          (
            <Menu>
              <MenuButton as="button">{session.user.username}</MenuButton>
              <MenuList color="#67686B">
                <MenuGroup color="#000">
                  <MenuItem>Perfil</MenuItem>
                  <MenuItem>Configuración</MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup color="#000">
                  <MenuItem onClick={() => signOut({ callbackUrl: '/login' })}>Salir</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          )
          :
          (
          <Link href="/login">
            Iniciar sesión
          </Link>
          )
        }
      </Box>
    )
  
}

