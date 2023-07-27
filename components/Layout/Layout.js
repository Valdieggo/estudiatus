/*import Sidebar from "./SideBar"
import Navbar from "./Navbar";
import { Grid, GridItem,Flex } from '@chakra-ui/react';
import { useEffect } from "react";

function Layout({ children }) {
    useEffect(() => {
        document.body.style.backgroundColor = "#151f32";
    }, []);

    return (
        <Flex bg="bg.100"
            color="white"
            w="100%"
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

export default Layout;*/

import { Box, Flex, IconButton, useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useEffect } from 'react';
const Layout = ({ children, user }) => {
    useEffect(() => {
        document.body.style.backgroundColor = "#151f32";
    }, []);
  return (
    <Box
        color="white"
        w="100%"
        h="100vh"
    >
      <Navbar user={user} />
      <Flex color="white">
        <Sidebar />
        <Box flex={1} p={5}>
          {children}
        </Box>
      </Flex>
    </Box>
  );
};

export default Layout;