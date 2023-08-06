import { BsFillTrashFill } from 'react-icons/bs';
import { Box, Button, Flex, useDisclosure, Icon, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import ModalDeletePost from './ModelDeletePost';

export default function DeleteButtonPost({ comment, comments, setComments }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Flex align="center" as="button" onClick={onOpen} w="full" >
            <Text mr={2}>Eliminar</Text>
            <Icon as={BsFillTrashFill} />
            <ModalDeletePost isOpen={isOpen} onClose={onClose} onOpen={onOpen} comment={comment}
                comments={comments} setComments={setComments} />
        </Flex>
    )
}