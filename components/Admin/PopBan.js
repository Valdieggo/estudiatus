import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverCloseButton, Button } from "@chakra-ui/react";
import { useState } from "react";

export function ConfirmationPopover({ message, onConfirm }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    setIsOpen(false);
    onConfirm();
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const openPopover = () => {
    setIsOpen(true);
  };

  return (
    <Popover isOpen={isOpen} onOpen={openPopover} onClose={handleCancel}>
      <PopoverTrigger>
        <Button colorScheme="yellow" mx={4}>
          Sancionar
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>Confirmación</PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>
          {message}
          <Button colorScheme="green" onClick={handleConfirm} ml={4}>
            Confirmar
          </Button>
          <Button colorScheme="red" onClick={handleCancel} ml={4}>
            Cancelar
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
