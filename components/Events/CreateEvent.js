import React, { useState } from 'react';
import {
  Box,
  Button,
  Spinner,
  useToast,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Select,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    eventDate: '',
    eventLocation: '',
    eventTime: '',
    eventType: 'Global',
    eventDescription: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();

  const { data: session } = useSession();

  const validateTimeInput = (input) => {
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(input);
  };

  const handleAddEvent = async () => {
    try {
      setIsAddingEvent(true);

      setFormErrors({});

      const errors = {};
      for (const field in formData) {
        if (!formData[field]) {
          errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} es requerido`;
        }
      }
      if (formData.eventTime && !validateTimeInput(formData.eventTime)) {
        errors.eventTime = 'Formato de hora inválido (HH:mm)';
      }

      if (Object.keys(errors).length > 0) {
        setIsAddingEvent(false);
        setFormErrors(errors);
        return;
      }

      const userId = session?.user?.id;

      const eventData = {
        eventName: formData.eventName,
        eventDate: formData.eventDate,
        eventLocation: formData.eventLocation,
        eventTime: formData.eventTime,
        eventCreator: userId,
        eventType: formData.eventType,
        eventDescription: formData.eventDescription,
      };

      const response = await axios.post(
        'http://localhost:3000/api/event/create',
        eventData
      );

      console.log(response.data.message);

      toast({
        title: 'Evento Creado',
        description: response.data.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      setFormData({
        eventName: '',
        eventDate: '',
        eventLocation: '',
        eventTime: '',
        eventType: 'Global',
        eventDescription: '',
      });
      setIsAddingEvent(false);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creando evento:', error);
      setIsAddingEvent(false);

      toast({
        title: 'Error Creando Evento',
        description: 'Un error ocurrió mientras se creaba el evento.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Button colorScheme="teal" onClick={() => setIsModalOpen(true)} mt={4}>
        Crear Evento
      </Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crear Evento</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>Nombre del Evento</FormLabel>
              <Input
                placeholder="Ingrese Nombre del Evento"
                value={formData.eventName}
                onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                mb={2}
              />
              {formErrors.eventName && <Text color="red">{formErrors.eventName}</Text>}
            </FormControl>
            <FormControl>
              <FormLabel>Fecha</FormLabel>
              <Input
                type="date"
                value={formData.eventDate}
                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                mb={2}
              />
              {formErrors.eventDate && <Text color="red">{formErrors.eventDate}</Text>}
            </FormControl>
            <FormControl>
              <FormLabel>Lugar</FormLabel>
              <Input
                placeholder="Ingrese Lugar del Evento"
                value={formData.eventLocation}
                onChange={(e) => setFormData({ ...formData, eventLocation: e.target.value })}
                mb={2}
              />
              {formErrors.eventLocation && <Text color="red">{formErrors.eventLocation}</Text>}
            </FormControl>
            <FormControl>
              <FormLabel>Hora</FormLabel>
              <Input
                placeholder="Ingrese Hora del Evento (HH:mm)"
                value={formData.eventTime}
                onChange={(e) => setFormData({ ...formData, eventTime: e.target.value })}
                onBlur={() => {
                  if (!validateTimeInput(formData.eventTime)) {
                    setFormErrors({ ...formErrors, eventTime: 'Formato de hora inválido (HH:mm)' });
                  }
                }}
                mb={2}
              />
              {formErrors.eventTime && <Text color="red">{formErrors.eventTime}</Text>}
            </FormControl>
            <FormControl>
              <FormLabel>Tipo de Evento</FormLabel>
              <Select
                value={formData.eventType}
                onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                mb={2}
              >
                <option value="Global">Global</option>
                <option value="Carrera">Carrera</option>
                <option value="Asignatura">Asignatura</option>
              </Select>
              {formErrors.eventType && <Text color="red">{formErrors.eventType}</Text>}
            </FormControl>
            <FormControl>
              <FormLabel>Descripción del Evento</FormLabel>
              <Input
                placeholder="Ingrese Descripción"
                value={formData.eventDescription}
                onChange={(e) => setFormData({ ...formData, eventDescription: e.target.value })}
                mb={2}
              />
              {formErrors.eventDescription && <Text color="red">{formErrors.eventDescription}</Text>}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="teal"
              onClick={handleAddEvent}
              isDisabled={isAddingEvent}
            >
              {isAddingEvent ? <Spinner /> : 'Crear Evento'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CreateEvent;