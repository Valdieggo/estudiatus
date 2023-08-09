import React from 'react';
import { Button } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import EditEventModal from './EditEventModal';

export default function EditEventButton({ event, onClose }) {
  const { isOpen, onOpen, onClose: onCloseEdit } = useDisclosure();

  return (
    <>
      <Button size="sm" onClick={onOpen} colorScheme="blue">
        Editar Evento
      </Button>
      <EditEventModal isOpen={isOpen} onClose={() => { onClose(); onCloseEdit(); }} event={event} />
    </>
  );
}