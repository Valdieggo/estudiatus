import {
  Flex,
  Box,
  Link,
  Grid,
  GridItem
} from "@chakra-ui/react";
import User from "./User";

export default function () {
  /**
   * return (
    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
      
      <Box >

      <Box>
        <Link px="4" href="/">
          Foro
        </Link>
        <Link px="4" href="/repository">
          Apuntes
        </Link>
        <Link px="4" href="/events">
          Eventos
        </Link>
      </Box>

      <User />
    </Box>
  );
   */
  //crea el navbar usando grid
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
