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
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // State for create event modal

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}:${process.env.PORT}/api/event/getAll`);
        console.log('API Response:', response.data); // Adjust the endpoint
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

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  return (
    <Layout>
      <VStack spacing={4} align="center">
        <Heading as="h2" size="md" mb={4}>
          Events List
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
          <CreateEvent isOpen={isCreateModalOpen} onClose={handleCloseCreateModal}/>
        </Center>
      </VStack>
    </Layout>
  );
};

export default EventsPage;