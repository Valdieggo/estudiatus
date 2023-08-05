import ModalCreateReport from "./ModalCreateReport";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";

export default function MenuReport({ post }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Button onClick={onOpen}>Reportar</Button>
            <ModalCreateReport isOpen={isOpen} onClose={onClose} post={post} onOpen={onOpen} />
        </>
    );

}