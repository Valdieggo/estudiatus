import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Button } from '@chakra-ui/react';
import DeleteEventButton from './DeleteEventButton';
import EditEventButton from './EditEventButton';
import { useSession } from 'next-auth/react';

const EventDetailsModal = ({ event, onClose }) => {
  const { data: session } = useSession();

  return (
    <Modal isOpen={!!event} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{event.eventName}</ModalHeader>
        <ModalBody>
          <p>Fecha: {new Date(event.eventDate).toLocaleDateString()}</p>
          <p>Lugar: {event.eventLocation}</p>
          <p>Hora: {event.eventTime}</p>
          <p>Tipo: {event.eventType}</p>
          <p>Descripción: {event.eventDescription}</p>
        </ModalBody>
        <ModalFooter>
          <DeleteEventButton
            event={selectedEvent}
            eventId={selectedEvent._id}
            allEvents={events}
            setAllEvents={setEvents}
          />
          <EditEventButton event={event} session={session} onClose={onClose} />
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EventDetailsModal;