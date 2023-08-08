import React, {useState, useEffect}from 'react'
import Layout from "../components/Layout/Layout";
import { useSession, getSession } from 'next-auth/react';
import Head from 'next/head';
import {
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

export default function Appeal() {

  const { data: session } = useSession();
  const [appeal,setAppeals]= useState([])

  const getAppeal = async () => {
    try {
      const response = await axios.get(`/api/appeal/getOneUser/${session.user.id}`);
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
  )}