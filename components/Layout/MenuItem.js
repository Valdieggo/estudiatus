import React, { useState } from 'react';
import { Avatar, Box, Flex, IconButton, Text, Divider, Stack, Link } from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';

export default function Home({ title, navSize, link }) {
    return (
        <Link href={link}>
            <Flex
                w="100%"
                justifyContent="center"
                placeItems="center"
                my="2"
            >
                {navSize === 'small'
                    ?
                    <Avatar bg="post.200" color="white" size="sm" name={title} />
                    :
                    <Text>{title}</Text>
                }
            </Flex>
        </Link>
    )
}