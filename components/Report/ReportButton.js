import ModalCreateReport from "./ModalCreateReport";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";

export default function ReportButton({ post }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Flex align="center" onClick={onOpen} w="full" >
            <Text mr={2}>Reportar</Text>
            <ModalCreateReport isOpen={isOpen} onClose={onClose} post={post} onOpen={onOpen} />

        </Flex>
    );

}