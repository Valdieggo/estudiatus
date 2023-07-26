/* import {
  Flex,
  Box,
  Link,
  Grid,
  GridItem
} from "@chakra-ui/react";
import User from "./User";

export default function Navbar() {
  return (
    <Box marginTop="1%">
      <Grid templateColumns="repeat(4, 1fr)" gap={1}>
        <GridItem>
          <Link px="4" href="/">
            Foro
          </Link>
        </GridItem>
        <GridItem>
          <Link px="4" href="/repository">
            Apuntes
          </Link>
        </GridItem>
        <GridItem>
          <Link px="4" href="/events">
            Eventos
          </Link>
        </GridItem>
        <GridItem marginLeft="auto">
          <User />
        </GridItem>
      </Grid>
    </Box>

  )
};

*/

import { Flex, Image, Text, useColorModeValue, Avatar } from '@chakra-ui/react';
import User from './User';
const Navbar = ({ user }) => (
  <Flex align="center" justify="space-between" px={5} py={4} bg="post.100">
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