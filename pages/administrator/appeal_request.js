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
  TableCaption
} from "@chakra-ui/react";
import axios from 'axios';
import {useRouter} from 'next/router'


export default function appeal_request() {
    verifyAdmin();

    const [appeals,setAppeals]= useState([])
    const router=useRouter()
    const getAppeals = async()=>{
    const { response } =await axios.get(`../api/appeal/getAll`)
    setAppeals(response.data)
  }

  useEffect(()=>{
    getAppeals()
  }, [])

  const showAppeals =()=>{
    return appeals.map(appeal =>{
        return(
            <Tr key={appeal._id} centerContent >
                <Td>{appeal.appealer}</Td>
                <Td>{appeal.name}</Td>
                <Td>{appeal.description}</Td>
                <Td>{appeal.status}</Td>
            </Tr>
        )
    })
  }
  return(
    <Layout>
    <Container maxW="container.xl" centerContent>
      <Heading textAlign={"center"} my={10}>Appeal Requests</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Td fontWeight="bold">Appealer name</Td>
            <Td fontWeight="bold">Appeal name</Td>
            <Td fontWeight="bold">Descripcion <Button size={'sm'}>ver mas</Button></Td>
            <Td fontWeight="bold">Status</Td>
            
          </Tr>
        </Thead>
      <Tbody>
      {showAppeals()}
    </Tbody>
      </Table>
    </Container>   
    </Layout>
)
}
