import { Box, Flex, IconButton, useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Navbar from './Navbar';
import Sidebar from './SideBar';
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
        overflowY="auto"
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