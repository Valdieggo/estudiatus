import React, { useState } from 'react';
import { Avatar, Box, Flex, IconButton, Text, Divider, Stack } from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import MenuItem from './MenuItem';
import Administrator from '../Admin/Administrator';

const Sidebar = () => {
    const [navSize, setNavSize] = useState('large');

    const changeNavSize = () => {
        setNavSize(navSize === 'small' ? 'large' : 'small');
    };


    return (
        <Stack mt="2">
            <Box
                pos="sticky"
                left="5"
                h="100vh"
                borderRightRadius="10px"
                w={navSize === 'small' ? 'fit' : '200px'}
                bgColor="post.100"
                overflow="auto"
                textColor="white"
            >
                <IconButton
                    color="white"
                    bg="post.100"
                    aria-label="Menu"
                    icon={<FiMenu />}
                    onClick={changeNavSize}
                    borderRightRadius="10px"
                    borderLeftRadius="0"
                    pos="sticky"
                    w="fit-content"
                    _focus={{ boxShadow: 'none' }}
                    _hover={{ background: 'post.200' }}
                />
                <Stack
                    p="5%"
                    flexDir="column"
                    w="100%"
                    alignItems='center'
                    as="nav"
                >
                    <MenuItem title="Universidades" link={"/college"} navSize={navSize} />

                    <MenuItem title="Calendar" navSize={navSize} />
                    <Divider />
                    <MenuItem title="Settings" navSize={navSize} />
                    <Administrator navSize={navSize} />
                </Stack>
            </Box>
        </Stack>
    );
};

export default Sidebar;

