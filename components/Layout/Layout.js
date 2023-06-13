import Sidebar from "./SideBar"
import Navbar from "./Navbar";
import { Box, Container, Flex, Stack } from "@chakra-ui/react";

function Layout({ children }) {
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
}

export default Layout;