import { Box, Flex, HStack, Text,Image, Link, CloseButton, Divider, VStack } from "@chakra-ui/react";
import SidebarItem from "./SidebarItem";
import { FiHome, FiTrendingUp, FiCompass, FiStar, FiSettings } from "react-icons/fi";
import AdministratorList from "../Admin/AdministratorList";
import SubsList from "../Subscribe/SubsList";

const LinkItems = [
    { name: 'Home', icon: FiHome },
    { name: 'Trending', icon: FiTrendingUp },
    { name: 'Explore', icon: FiCompass },
    { name: 'Favourites', icon: FiStar },
    { name: 'caca', icon: FiSettings },
]

export default function Sidebar({ onClose, ...rest }) {
    return (
        <Box
            transition="3s ease"
            bg="post.100"
            color="white"
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Link href="/">
                    <HStack>
                        <Image src="/estudiatus.svg" alt="Logo Estudiatus" boxSize="50px" />
                        <Text fontSize="xl" fontWeight="bold">
                            Estudiatus
                        </Text>
                    </HStack>
                </Link>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            <Text mx="8" my="4" fontWeight="bold" fontSize="xs" letterSpacing="wide" textTransform="uppercase" color="gray.400">Main</Text>
            <SidebarItem icon={FiHome} link={"/colleges"}>
                Universidades
            </SidebarItem>
            <SidebarItem icon={FiTrendingUp} link={"/calendar"}>
                Calendario
            </SidebarItem>
            <AdministratorList />
            <SubsList />
        </Box>
    );
}


// import React, { useState } from 'react';
// import { Avatar, Box, Flex, IconButton, Text, Divider, Stack } from '@chakra-ui/react';
// import { FiMenu } from 'react-icons/fi';
// import MenuItem from './MenuItem';
// import Administrator from '../Admin/Administrator';
// import SubsList from '../Subscribe/SubsList';

// const Sidebar = () => {
//     const [navSize, setNavSize] = useState('large');

//     const changeNavSize = () => {
//         setNavSize(navSize === "small" ? "large" : "small");
//     };


//     return (
//         <Stack mt="2">
//             <Box
//                 pos="sticky"
//                 left="5"
//                 h="100vh"
//                 borderRightRadius="10px"
//                 w={navSize === 'small' ? 'fit-content' : '15vw'}
//                 bgColor="post.100"
//                 overflow="auto"
//                 textColor="white"
//             >
//                 <IconButton
//                     color="white"
//                     bg="post.100"
//                     aria-label="Menu"
//                     icon={<FiMenu />}
//                     onClick={changeNavSize}
//                     borderRightRadius="10px"
//                     borderLeftRadius="0"
//                     pos="sticky"
//                     w="fit-content"
//                     _focus={{ boxShadow: 'none' }}
//                     _hover={{ background: 'post.200' }}
//                 />
//                 <Stack
//                     p="5%"
//                     flexDir="column"
//                     w="100%"
//                     alignItems="center"
//                     as="nav"
//                 >
//                     {
//                         navSize === 'large' &&
//                         <Text fontSize="lg" fontWeight="bold" color="post.300">
//                             Navegación
//                         </Text>
//                     }
//                     <MenuItem title="Universidades" link={"/college"} navSize={navSize} />
//                     <Divider />
//                     <MenuItem title="Calendar" navSize={navSize} />
//                     <SubsList navSize={navSize} />
//                     <Administrator navSize={navSize} />
//                 </Stack>
//             </Box>
//         </Stack>
//     );
// };

// export default Sidebar;
