import { BsFillTrashFill } from 'react-icons/bs';
import { Box, Button, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useDisclosure } from '@chakra-ui/react'
import ModalDeleteComment from './ModalDeleteComment';

export default function DeleteCommentButton({ comment, comments, setComments }) {
    const { data: session, status } = useSession();
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    return (
        <Flex align="center" as="button" onClick={onOpen} w="full" >
            <Text mr={2}>Eliminar</Text>
            <Icon as={BsFillTrashFill} />
            <ModalDeleteComment isOpen={isOpen} onClose={onClose} onOpen={onOpen} comment={comment}
                comments={comments} setComments={setComments} />
        </Flex>
    )
}