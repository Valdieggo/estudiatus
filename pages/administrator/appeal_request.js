import React, {useState, useEffect}from 'react'
import Layout from "../../components/Layout/Layout";
import Head from 'next/head';
import verifyAdmin from "../../utils/verifyAdmin";
import {
  Box,
  Container,
  Heading,
  Button,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer
} from "@chakra-ui/react";
import axios from 'axios';


export default function appeal_request() {
    verifyAdmin();

    const [appeal,setAppeals]= useState([])
    const getAppeal = async () => {
      try {
        const response = await axios.get("../api/appeal/getAll");
        setAppeals(response.data);
      } catch (error) {
        console.error(error);
      }
    };

  useEffect(()=>{
    getAppeal()
  }, [])
  return (
    <>
      <Layout>
      <TableContainer maxW="90vw" mx="auto" >
        <Table variant={"simple"}>
          <TableCaption>Appeals requests</TableCaption>
          <Thead>
            <Tr>
              <Th>Appeal name</Th>
              <Th>Description</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {appeal.appeals?.map((appeal) => (
              <Tr key={appeal._id}>
                <Td>{appeal.name}</Td>
                <Td>{appeal.description}</Td>
                <Td>{appeal.status}</Td>
                <Td>
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
