import React, { useState } from "react";
import {
    Avatar,
    Box,
    Flex,
    IconButton,
    Text,
    Divider,
    Stack,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";

const Sidebar = () => {
    const [navSize, setNavSize] = useState("large");

    const changeNavSize = () => {
        setNavSize(navSize === "small" ? "large" : "small");
    };

    const MenuItem = ({ title }) => {
        return (
            <Flex w="100%" justifyContent="center" placeItems="center" my="2">
                {navSize === "small" ? (
                    <Avatar
                        bg="post.200"
                        color="white"
                        size="sm"
                        name={title}
                    />
                ) : (
                    <Text>{title}</Text>
                )}
            </Flex>
        );
    };

    return (
        <Stack mt="2" pos="sticky" top="64">
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
                _focus={{ boxShadow: "none" }}
                _hover={{ background: "post.200" }}
            />
            <Box
                pos="sticky"
                top="0"
                left="5"
                h="100vh"
                borderRightRadius="10px"
                w={navSize === "small" ? "fit" : "150px"}
                bgColor="post.100"
                overflow="auto"
                textColor="white"
            >
                <Stack
                    p="5%"
                    flexDir="column"
                    w="100%"
                    alignItems="center"
                    as="nav"
                >
                    <MenuItem title="Dashboard" />
                    <MenuItem title="Calendar" />
                    <MenuItem title="Clients" />
                    <Divider />
                    <MenuItem title="Animals" />
                    <MenuItem title="Stocks" />
                    <MenuItem title="Reports" />
                    <MenuItem title="Settings" />
                </Stack>
            </Box>
        </Stack>
    );
};

export default Sidebar;
