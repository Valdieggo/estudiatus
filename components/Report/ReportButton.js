import ModalCreateReport from "./ModalCreateReport";
import { useDisclosure } from "@chakra-ui/react";
import { Button, Icon } from "@chakra-ui/react";
import { ChatIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { BsFillTrashFill } from "react-icons/bs";
import { Flex, Text } from "@chakra-ui/react";


export default function MenuReport({ reportedUser, postId }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>

        <Flex align="center" as="button" onClick={onOpen} w="full" >
            <Text mr={2}>Reportar</Text>
            <Icon as={BsFillTrashFill} />
            <ModalCreateReport isOpen={isOpen} onClose={onClose} reportedUser={reportedUser} postId={postId} />
        </Flex>
        </>
    );

}