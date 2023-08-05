import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Flex,
    Text,
    Avatar,
    Link,

  } from '@chakra-ui/react'
import { Button, Icon } from "@chakra-ui/react";
import { ChatIcon, ChevronDownIcon } from "@chakra-ui/icons";
import DeleteCommentButton from './DeleteCommentButton';
import {useState } from "react";
import { useSession } from "next-auth/react";

export default function MenuComment({comment, comments, setComments}) {    
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
                    comment?.creator?._id === session?.user?.id 
                    && 
                    <MenuItem>
                        <DeleteCommentButton comment={comment} comments={comments} setComments={setComments}/>
                    </MenuItem>
                }
                {
                    comment?.creator?._id !== session?.user?.id 
                    && 
                    <MenuItem>
                        Reportar              
                    </MenuItem>
                }
            </MenuList>
        </Menu>
    )
}

