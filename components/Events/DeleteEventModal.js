import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalCloseButton,
  Flex,
  Button,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

export default function DeleteEventModal({
  isOpen,
  onClose,
  eventId,
  allEvents,
  setAllEvents,
  eventCreatorId,
}) {
  const { data: session } = useSession();
  const isAdmin = session?.user.role === 'admin';
  const toast = useToast();

  const handleDeleteEvent = async () => {
    if (isAdmin) {
      axios
        .delete(`${process.env.NEXT_PUBLIC_URL}:${process.env.PORT}/api/event/delete/${eventId}`)
        .then((res) => {
          setAllEvents(allEvents.filter((event) => event.id !== eventId));

          toast({
            title: 'Evento eliminado',
            description: 'El evento ha sido eliminado exitosamente.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });

          onClose();
        })
        .catch((err) => {
          console.log(err);

          toast({
            title: 'Error al eliminar',
            description: 'Ha ocurrido un error al intentar eliminar el evento.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        });
    } else {
      toast({
        title: 'Permiso Denegado',
        description: 'Solo los administradores pueden eliminar eventos.',
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
                    ¿Quieres eliminar este evento?
                </ModalHeader>
                <ModalCloseButton color="white" />
                <ModalFooter>
                    <Flex direction="row" w="full" justifyContent="center" alignItems="center" gap={2}>
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
                            onClick={handleDeleteEvent}
                            _hover={{
                                bg: 'red.400',
                            }}
                        >
                            Eliminar
                        </Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
  );
}