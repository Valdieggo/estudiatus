import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, Text, Stack, Grid, Button, Spinner} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ModalReport({ isOpen, onClose, reportId }) {

    const [report, setReport] = useState(null);
    

    useEffect(() => {
      const fetchReport = async () => {
        try {
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

    const handlreClose = () => {
        setReport(null);
        onClose();
    }



  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"xl"}  closeOnOverlayClick={false} >
      <ModalOverlay backdropFilter='auto' backdropBlur='2px' />
      <ModalContent background="bg.100" color="white">
        <ModalHeader>Report Details</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
        {report ? (
            <>
                <Stack spacing={1}>
                    <Text fontWeight="bold">Reported User:</Text>
                    <Grid templateColumns="auto 1fr" columnGap= "50%">
                    <Text>{report.reportedUser.username}</Text>
                    <Text>{report.reportedUser.email}</Text>
                    </Grid>
                    <Text fontWeight="bold">Reason:</Text>
                        <Text>{report.reason}</Text>
                    <Text fontWeight="bold">Description:</Text>
                        <Text>{report.description}</Text>

                </Stack>
            </>
          ) : (
            <Stack spacing={4} alignItems="center">
              <Spinner size="xl" />
              <Text>Loading...</Text>
            </Stack>
          )}
        </ModalBody>
        <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={handlreClose}>
                Close
            </Button>


        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
