import { Flex, Text, Button } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import DeleteEventModal from './DeleteEventModal'; // Adjust the import path

export default function DeleteButtonEvent({ event, allEvents, setAllEvents }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteButtonClick = (event) => {
    event.stopPropagation(); // Prevent event propagation
    onOpen();
  };

  return (
    <div style={{ width: 'fit-content' }} onClick={handleDeleteButtonClick}>
      <Button size="sm" colorScheme="red">
        Eliminar
      </Button>
      <DeleteEventModal
        isOpen={isOpen}
        onClose={onClose}
        allEvents={allEvents}
        setAllEvents={setAllEvents}
      />
    </div>
  );
}