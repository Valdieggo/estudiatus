import React from "react";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import { Box, Drawer, DrawerContent, useDisclosure, useColorModeValue } from "@chakra-ui/react";

const Layout = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minH="100vh" bg="bg.100" color="white">
      <SideBar onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SideBar onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Navbar onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

export default Layout;

// import { Grid, GridItem } from '@chakra-ui/react'
// import { Box, Flex, IconButton, useDisclosure } from '@chakra-ui/react';
// import { HamburgerIcon } from '@chakra-ui/icons';
// import Navbar from './Navbar';
// import Sidebar from './SideBar';
// import { useEffect } from 'react';
// const Layout = ({ children, user }) => {
  
//   return (
    
//   )
//   // return (
//   //   <Box
//   //       color="white"
//   //       w="100%"
//   //       h="100vh"
//   //       overflowY="auto" 
//   //       bg="bg.100"
//   //   >
//   //     <Navbar user={user} />
//   //     <Flex color="white">
//   //         <Sidebar />
//   //         <Box flex={1} p={5}>
//   //         {children}
//   //         </Box>
//   //     </Flex>
//   //   </Box>

//   // );
// };

// export default Layout;