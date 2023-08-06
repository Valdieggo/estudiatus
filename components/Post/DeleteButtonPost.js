import { BsFillTrashFill } from 'react-icons/bs';
import { Box, Button, Flex, useDisclosure, Icon, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import ModalDeletePost from './ModelDeletePost';

export default function DeleteButtonPost({ post, allPosts, setAllPosts }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Flex align="center" onClick={onOpen} w="full" >
            <Text mr={2}>Eliminar</Text>
            <ModalDeletePost isOpen={isOpen} onClose={onClose} onOpen={onOpen} post={post}
                allPosts={allPosts} setAllPosts={setAllPosts} />
        </Flex>
    )
}