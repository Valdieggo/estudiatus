import Layout from "../../components/Layout/Layout";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,

} from '@chakra-ui/react';
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import axios from "axios";
import ModalReport from "../../components/Report/ModalReport";
import { useDisclosure } from "@chakra-ui/react";


export default function Moderation() {
  const { data: session, status } = useSession()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [report, setReport] = useState([]); 
  const[reportId, setReportId] = useState(null);

  const openModalReport = (id) => {
    setReportId(id);
    onOpen();
  };

  const getReport = async () => {
    try {
      const response = await axios.get("../api/report/getAll");
      setReport(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getReport();

  }, []);

  return (
    // Se agrega el componente Layout centrado en medio de la pantalla
    <>
      <Layout>
     
     

      <TableContainer maxW="90vw" mx="auto" >
        <Table variant={"simple"}>
          <TableCaption>Reported Users</TableCaption>
          <Thead>
            <Tr>
              <Th>Username</Th>
              <Th>Report Reason</Th>
              <Th>Desription</Th>
              <Th>Option</Th>
            </Tr>
          </Thead>
          <Tbody>
            {report.reports?.map((report) => (
              <Tr key={report._id}>
                <Td>{report.reportedUser.username}</Td>
                <Td>{report.reason}</Td>
                <Td>{report.description}</Td>
                <Td>
                  <Button colorScheme="green" onClick={()=>openModalReport(report._id)}>
                    Vew
                  </Button>
                  
                </Td>
              </Tr>
            ))}
            <ModalReport isOpen={isOpen} onClose={onClose} onOpen={onOpen} reportId={reportId} />
          </Tbody>
        </Table>
      </TableContainer>
      </Layout>
      
    </>
  );
}
