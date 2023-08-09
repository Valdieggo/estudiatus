import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  Button,
  Flex,
  Input,
  useToast,
  Select,
} from '@chakra-ui/react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

export default function EditEventModal({ isOpen, onClose, event }) {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventType, setEventType] = useState('Global');
  const [eventDescription, setEventDescription] = useState('');
  const toast = useToast();

  const { data: session } = useSession();

  useEffect(() => {
    if (isOpen && event) {
      fetchEventDetails(event._id);
    }
  }, [isOpen, event]);


  const fetchEventDetails = async (eventId) => {
    try {
      const response = await axios.get(`/api/event/getById/${eventId}`);
      const eventData = response.data.data;
      setEventFields(eventData);
    } catch (error) {
      console.error('Error fetching event details:', error);
    }
  };

  const setEventFields = (eventData) => {

    const formattedDate = new Date(eventData.eventDate).toISOString().split('T')[0];

    setEventName(eventData.eventName);
    setEventDate(formattedDate);
    setEventLocation(eventData.eventLocation);
    setEventTime(eventData.eventTime);
    setEventType(eventData.eventType);
    setEventDescription(eventData.eventDescription);
  };


  const validateTimeInput = (input) => {
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(input);
  };

  const handleUpdateEvent = async () => {
    try {
      if (!session) {
        toast({
          title: 'Acceso Denegado',
          description: 'Debes iniciar sesión para editar un evento.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      const isAdmin = session?.user.role === 'admin';

      if (!isAdmin) {
        toast({
          title: 'Permiso Denegado',
          description: 'Solo los administradores pueden editar eventos.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      const eventData = {
        eventName: eventName,
        eventDate: eventDate,
        eventLocation: eventLocation,
        eventTime: eventTime,
        eventType: eventType,
        eventDescription: eventDescription,
      };
  
      try {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_URL}:${process.env.PORT}/api/event/update/${event._id}`,
          eventData
        );
  
        console.log(response.data.message);
  
        toast({
          title: 'Evento Editado',
          description: response.data.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
  
        onClose();
      } catch (error) {
        console.error('Error Editando Evento:', error);
  
        toast({
          title: 'Error Editando Evento',
          description: 'Un error ocurrió mientras se editaba el evento.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error Verificando Permiso:', error);
  
      toast({
        title: 'Error',
        description: 'Ha ocurrido un error al verificar el permiso.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="post.100">
        <ModalHeader mt="6" color="white" textAlign="center">
          ¿Quieres editar este evento?
        </ModalHeader>
        <ModalCloseButton color="white" />
        <Flex direction="column" alignItems="center">
        <Input w="420px"
          textColor="white"
          placeholder="Nombre del Evento"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          my={4}
        />
        <Input w="420px"
          textColor="white"
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          my={4}
        />
        <Input w="420px"
          textColor="white"
          placeholder="Lugar del Evento"
          value={eventLocation}
          onChange={(e) => setEventLocation(e.target.value)}
          my={4}
        />
        <Input w="420px"
          textColor="white"
          placeholder="Hora del Evento (HH:mm)"
          value={eventTime}
          onChange={(e) => {
            const inputTime = e.target.value;
            setEventTime(inputTime);
          }}
          onBlur={() => {
            if (!validateTimeInput(eventTime)) {
              setEventTime('');
            }
          }}
          my={4}
        />
        <Select w="420px"
          textColor="white"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          my={4}
        >
          <option value="Global">Global</option>
          <option value="Carrera">Carrera</option>
          <option value="Asignatura">Asignatura</option>
        </Select>
        <Input w="420px"
          textColor="white"
          placeholder="Descripción del Evento"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
          my={4}
        />
        </Flex>
        <ModalFooter>
          <Flex
            direction="row"
            w="full"
            justifyContent="center"
            alignItems="center"
            gap={2}
          >
            <Button
              color="white"
              bg="button.100"
              w="full"
              onClick={onClose}
              _hover={{
                bg: 'button.200',
              }}
            >
              Cancelar
            </Button>
            <Button
              color="white"
              bg="red.600"
              w="full"
              onClick={handleUpdateEvent}
              _hover={{
                bg: 'cyan.200',
              }}
            >
              Editar
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}