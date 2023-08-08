import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Icon, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import ReportButton from '../Report/ReportButton';
import DeleteButtonPost from './DeleteButtonPost';
import EditButtonPost from './EditButtonPost';
import LoginModal from '../Auth/LoginModal';
import { useDisclosure } from '@chakra-ui/react';

export default function MenuPost({ post, allPosts, setAllPosts,subjectId }) {
    const { creator } = post;
    const { isOpen, onOpen, onClose } = useDisclosure();

    let isCreatorId = false;
    const { data: session, status } = useSession();
    if (session && creator && creator._id) {
        isCreatorId = session.user.id === creator._id;
    }

    const isAdmin = session?.user.role === "admin";
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
                {isAdmin || isCreatorId ? (
                    <MenuItem>
                        <DeleteButtonPost post={post} allPosts={allPosts} setAllPosts={setAllPosts} />
                    </MenuItem>
                ) : null}

                {post?.creator?._id !== session?.user?.id && session ? (
                <MenuItem>
                    <ReportButton post={post} />
                </MenuItem>
                ) : null}
            </MenuList>
            
        </Menu>
    );
}

