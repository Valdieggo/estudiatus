import React from "react";
import { Box, Heading, Text, Button, HStack } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";


const BannedModal = ({ isOpen, onClose, idBan }) => {
  const [ban, setBan] = useState(null);
  useEffect(() => {
    const ban = async () => {
      try {
        const response = await axios.get(`../api/ban/getOne/${idBan}`);
        setBan(response.data.ban);
      } catch (error) {
        console.error(error);
      }
    };
    if (isOpen && idBan) {
      ban();
    }
  }, [isOpen, idBan]);

  const router= useRouter();


  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent  background="bg.100" color="white">
        <ModalHeader>
          <Heading size="lg">You are banned</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <Text mt="4">You are banned until {ban?.time}</Text>
          <Text mt="4">Contact support for more information.</Text>
        </ModalBody>
        <ModalFooter>
          <HStack>
          <Button colorScheme="whiteAlpha" onClick={()=> router.push(`../../pages/appealForm/${idBan}`)}>Appeal</Button>
          <Button colorScheme="blue" onClick={onClose}>Close</Button> 
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BannedModal;
