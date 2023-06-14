import Sidebar from "./SideBar"
import Navbar from "./Navbar";
import { Grid, GridItem } from "@chakra-ui/layout";
import { Box, Drawer, Flex, Heading, Text } from '@chakra-ui/react';

function Layout({ children }) {
    /*original
    return (
        <Container
            bg="bg.100"
            maxW="100vw"
            minH="100vh"
            color="white"
            >
            <Stack>
                <Navbar />
                <Sidebar />
            </Stack>

            
            <Flex ml="200px" p="4">
                <Box>{children}</Box>
            </Flex>
        </Container>
    ); 

  */

    return (
        <Box bg="bg.100"
            color="white">
            <Grid
                templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
                gridTemplateRows={'50px 1fr 30px'}
                gridTemplateColumns={'200px 1fr'}
                h="100vh"
                gap='1'
                fontWeight='bold'
                minchildwidth="100%"
            >
                <GridItem pl='2'  area={'header'}>
                    <Navbar />
                </GridItem>
                <GridItem pl='2' area={'nav'}>
                    <Sidebar />
                </GridItem>
                <GridItem pl='2'  area={'main'} display="block">
                    {children}
                </GridItem>
                <GridItem pl='2'  area={'footer'}>
                    Aqui va el Footer blablabla bla bla Todos los derechos reservados
                </GridItem>
            </Grid>
        </Box>
    )
}

export default Layout;