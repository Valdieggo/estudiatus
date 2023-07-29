import React from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from "@chakra-ui/react";

const ErrorModal = ({ isOpen, onClose, errorMessage }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent background="bg.100" color="white">
        <ModalHeader>
          <Heading size="lg">Error</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mt="4">{errorMessage}</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ErrorModal;


