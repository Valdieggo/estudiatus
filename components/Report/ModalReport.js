import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, Text, Stack, Grid, Button, Spinner, Center } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import ConfirmationPopover from "./PopOverReport";


export  default function ModalReport({ isOpen, onClose, reportId }) {
  const [report, setReport] = useState(null);
  const [showPopover, setShowPopover] = useState(false);

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
    console.log("Sancionado");
    console.log(sancionData);
    setShowPopover(false);
    const createBan = async () => {
      try {
        const response = await axios.post("../api/ban/create", {
          user: report.reportedUser._id,
          type: sancionData.type,
          time: sancionData.time,
          status: "active",
          report: report._id,
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    createBan();

  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" closeOnOverlayClick={false}>
      <ModalOverlay  bg='blackAlpha.400'  backdropBlur="2px" />
      <ModalContent background="bg.100" color="white">
        <ModalHeader>Report Details</ModalHeader>
        <ModalCloseButton background="red" onClick={onClose} />
        <ModalBody>
          {report ? (
            <>
              <Stack spacing={1}>
                <Text fontWeight="bold">Usuario reportado:</Text>
                <Grid templateColumns="auto 1fr" columnGap="50%">
                  <Text>{report.reportedUser.username}</Text>
                  <Text>{report.reportedUser.email}</Text>
                </Grid>
                <Text fontWeight="bold">Razon:</Text>
                <Text>{report.reason}</Text>
                <Text fontWeight="bold">Descripcion:</Text>
                <Text>{report.description}</Text>
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
          <Button colorScheme="green" mx={10} onClick={onClose}>
            No sancionar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}