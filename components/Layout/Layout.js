import Sidebar from "./SideBar"
import Navbar from "./Navbar";
import { Grid, GridItem,Flex } from '@chakra-ui/react';
import { useEffect } from "react";

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

    //construye un layout a la derecha del sidebar

    useEffect(() => {
        document.body.style.backgroundColor = "#151f32";
    }, []);

    return (
        <Flex bg="bg.100"
            color="white"
        >
            <Grid
                templateAreas={`"nav header"
      "nav main"
      "nav footer"`}
                gridTemplateRows={'60px 1fr 30px'}
                gridAutoColumns={'min-content auto'}
                gap='5'
                fontWeight='bold'
                flexGrow="1"
            >
                <GridItem pl='1' area={'header'}>
                    <Navbar />
                </GridItem>
                <GridItem pl='1' area={'nav'}>
                    <Sidebar />
                </GridItem>
                <GridItem pl='1' area={'main'} >
                    {children}
                </GridItem>
                <GridItem pl='1' area={'footer'}>
                    footer
                </GridItem>
            </Grid>
        </Flex>
    )
}

export default Layout;