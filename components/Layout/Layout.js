import Sidebar from "./Sidebar"
import Navbar from "./Navbar";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";

function Layout({ children }) {
    return (
        <>
        <Sidebar />
        <Navbar />
        <Flex ml="200px" p="4">
            <Box>{children}</Box>
        </Flex>
        </>
    );
}

export default Layout;