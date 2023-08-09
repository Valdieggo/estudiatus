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
import { useEffect, useState } from "react";
import axios from "axios";

import ReportTr from "../../components/Report/ReportTr";

export default function Moderation({ listReport }) {
  const [reports, setReports] = useState(listReport);
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
            {reports.map((report) => (
              <ReportTr key={report._id} report={report} reports={reports} setReports={setReports} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const res = await axios.get(`http://localhost:${process.env.NEXT_PUBLIC_PORT}/api/report/getAll`);
  const data = await res.data.reports;
  if (res.status === 400) {
      return {
          notFound: true,
      };
  }

  return {
      props: {
          listReport: data,
      },
  };
}