import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Icon, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import ReportButton from '../Report/ReportButton';
import DeleteButtonPost from './DeleteButtonPost';

export default function MenuPost({ post,allPosts, setAllPosts }) {
    const { data: session, status } = useSession();
    return (
        <Menu gutter={0}>
        <MenuButton as="button" color="button.100" _hover={
            {
            bg: "button.200",
            }
        }>
        <Icon as={ChevronDownIcon} />
        </MenuButton>
        <MenuList color="#67686B" p={0} bg="none">
            {
                post?.creator?._id === session?.user?.id
                &&
                <MenuItem>
                    <DeleteButtonPost post={post} allPosts={allPosts} setAllPosts={setAllPosts}/>
                </MenuItem>
            }
            {
                post?.creator?._id !== session?.user?.id
                &&
                <MenuItem >
                    <ReportButton post={post}/>
                </MenuItem>
            }
        </MenuList>
    </Menu>
    );
}

