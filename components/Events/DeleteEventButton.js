import { Flex, Text, Button } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import DeleteEventModal from './DeleteEventModal';

export default function DeleteButtonEvent({ event, allEvents, eventId, setAllEvents }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteButtonClick = (event) => {
    event.stopPropagation();
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
        eventId={eventId}
        allEvents={allEvents}
        setAllEvents={setAllEvents}
      />
    </div>
  );
}