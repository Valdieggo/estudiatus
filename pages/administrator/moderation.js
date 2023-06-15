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

export default function Moderation() {
  const { data: session, status } = useSession()
  // se hace la petición a la base de datos para obtener los reportes
  const [report, setReport] = useState([]); // se crea un estado para guardar los datos de los reportes

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

  return (
    // Se agrega el componente Layout centrado en medio de la pantalla
    <>
      <Layout>
      <TableContainer maxW="90vw" mx="auto">
        <Table variant={"simple"}>
          <TableCaption>Reported Users</TableCaption>
          <Thead>
            <Tr>
              <Th>Username</Th>
              <Th>Report Reason</Th>
              <Th>Desription</Th>
              <Th></Th>
              <Th>Option</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {report.reports?.map((report) => (
              <Tr key={report._id}>
                <Td>{report.reportedUser.username}</Td>
                <Td>{report.reason}</Td>
                <Td>{report.description}</Td>
                <Td>
                  <Button colorScheme="green" onClick={() => {deleteReport(report._id);}}>
                    Vew
                  </Button>
                </Td>
                <Td>
                  <Button colorScheme="yellow" onClick={() => {deleteReport(report._id);}}>
                    Update
                  </Button>
                </Td>
                <Td>
                  <Button colorScheme="red" onClick={() => {deleteReport(report._id);}}>
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      </Layout>
    
    </>
  );
}
