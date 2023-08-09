import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  VStack,
  Center,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import Layout from '../components/Layout/Layout';
import CreateEvent from '../components/Events/CreateEvent';
import EventDetailsModal from '../components/Events/EventDetailsModal';


const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const history = useHistory(); 

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`/api/event/getAll`);
        console.log('API Response:', response.data);
        setEvents(response.data.events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCreateEventSuccess = () => {
    setIsCreateModalOpen(false);
    history.push('/events');
  };

  return (
    <Layout>
      <VStack spacing={4} align="center">
        <Heading as="h2" size="md" mb={4}>
          Lista de Eventos
        </Heading>
        {events.map((event) => (
          <Box w="500px"
            key={event._id}
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            onClick={() => handleEventClick(event)}
            cursor="pointer"
          >
            <Text>{event.eventName}</Text>
            <Text>{new Date(event.eventDate).toLocaleDateString()}</Text>
          </Box>
        ))}
        {selectedEvent && (
          <EventDetailsModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
        )}
        <Center>
          <CreateEvent onSuccess={handleCreateEventSuccess} isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}/>
        </Center>
      </VStack>
    </Layout>
  );
};

export default EventsPage;