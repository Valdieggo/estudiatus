import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, Text, Stack, Grid, Button, Spinner, Center, useToast, Box, Divider } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import ConfirmationPopover from "./PopOverReport";


export  default function ModalReport({ isOpen, onClose, reportId ,  setReports, reports}) {
  const [report, setReport] = useState(null);
  const [showPopover, setShowPopover] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        console.log(reportId);
        const response = await axios.get(`../api/report/getOne/${reportId}`);
        setReport(response.data.report);
      } catch (error) {
        console.error(error);
      }
    };

    if (isOpen && reportId) {
      fetchReport();
    }
  }, [isOpen, reportId]);

  const handleConfirmBan = (sancionData) => {
    setShowPopover(false);
    const createBan = async () => {
        try {
          const response = await axios.post("../api/ban/create", {
            user: report.reportedUser._id,
            type: sancionData.type,
            time: sancionData.time,
            status: "active",
            report: report._id,
          })
          if (response.status===201){
            toast({
              title: "Usuario sancionado",
              description: "El usuario ha sido sancionado exitosamente.",
              status: "success",
              duration: 3000,
              isClosable: true,
            });

            setReports(prevReports => prevReports.filter(report => report._id !== reportId))
          }else{
            toast({
              title: "Error al sancionar",
              description: "Ha ocurrido un error al intentar sancionar al usuario.",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
        } catch (error) {
         toast({
            title: "Error al sancionar",
            description: "Ha ocurrido un error al intentar sancionar al usuario.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
        onClose();
      };
    createBan();
  };


  const handleNoSancionar = () => {
    const updateReport = async () => {
      try {
        const response = await axios.put(`../api/report/update`, {
          id: report._id,
        }).then((res) => {
          if (res.status === 200) {
            toast({
              title: "Reporte actualizado",
              description: "El reporte ha sido actualizado exitosamente.",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            setReports(prevReports => prevReports.filter(report => report._id !== reportId))
          }else{
            toast({
              title: "Error al actualizar el reporte",
              description: "Ha ocurrido un error al intentar actualizar el reporte.",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
        }
        );

      } catch (error) {
        console.error(error);
      }
    }
    updateReport();
    onClose();

  };



  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" closeOnOverlayClick={false}>
      <ModalOverlay  bg='blackAlpha.400'  backdropBlur="2px" />
      <ModalContent background="bg.100" color="white">
        <ModalCloseButton background="red" onClick={onClose} />
        <ModalBody>
          {report ? (
            <>
            <Stack spacing={3}>
              <Text fontWeight="semibold" fontSize="lg">Reporte</Text>

              <Text fontWeight="bold">Información usuario reportado:</Text>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <Box>
                      <Text fontSize="sm" color="gray.500">Nombre de usuario:</Text>
                      <Text>{report.reportedUser.username}</Text>
                  </Box>
                  <Box>
                      <Text fontSize="sm" color="gray.500">Email:</Text>
                      <Text>{report.reportedUser.email}</Text>
                  </Box>
              </Grid>

              <Text  fontSize="sm" color="gray.500">Razón:</Text>
              <Text>{report.reason}</Text>

              <Text  fontSize="sm" color="gray.500">Descripción:</Text>
              <Text>{report.description}</Text>
              <Divider />
              <Text fontWeight="bold">Acerca del Post:</Text>
              <Box pl={4}>
                  <Text fontSize="sm" color="gray.500">Título:</Text>
                  <Text>{report.post.title}</Text>

                  <Text fontSize="sm" color="gray.500" mt={2}>Contenido:</Text>
                  <Text>{report.post.content}</Text>
              </Box>
            </Stack>
            </>
          ) : (
            <Stack spacing={4} alignItems="center">
              <Spinner size="xl" />
              <Text>Cargando...</Text>
            </Stack>
          )}
        </ModalBody>
        <ModalFooter justifyContent="center">
            <ConfirmationPopover
              message="¿Estás seguro de que deseas sancionar?"
              onConfirm={handleConfirmBan}
            />
          <Button colorScheme="green" mx={10} onClick={handleNoSancionar}>
            No sancionar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}