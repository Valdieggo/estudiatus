import Layout from "../../components/Layout/Layout";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
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
import ModalReport from "../../components/Admin/modalReport";

export default function Moderation() {
  const { data: session, status } = useSession()
  const [report, setReport] = useState([]); 
  const [modalReport, setModalReport] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null); 

  const getReport = async () => {
    try {
      const response = await axios.get("../api/report/getAll");
      setReport(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getReport();
  }, []);

  const openModalReport = (report) => {
    setSelectedReport(report);
    setModalReport(true);
  };
  const closeModalReport = () => {
    setSelectedReport(null);
    setModalReport(false);
  };



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
                  <Button colorScheme="green" onClick={()=>openModalReport(report)}>
                    Vew
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      </Layout>
      <ModalReport isOpen={modalReport} onClose={closeModalReport} reportId={selectedReport?._id} />
    </>
  );
}
