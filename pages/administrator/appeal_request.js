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

        //Obtener todas las apelaciones//falta escribir el getAll

    const { response } =await axios.get(`../api/appeal/getAll`)
    setAppeals(response.data)
  }

  useEffect(()=>{
    getAppeals()
  }, [])

/*const onDelete= async (id)=>{
  Swal.fire({
    title: 'Adveterncia',
    text:'¿Está seguro que desea eliminar el espacio?',
    icon: 'info',
    showCloseButton: true,
    showCancelButton: true,
    confirmButtonText:'Sí, eliminar',
    cancelButtonText:'Cancelar'
  }).then(async(result)=>{
    if(result.isConfirmed){
      const response= await axios.delete(`${process.env.API_URL}/espaciocom/delete/${id}`)
      router.push('/admin/admin')
      return response
    }
})
  
}*/

  const showAppeals =()=>{
    return appeals.map(appeal =>{
        return(
            <Tr key={appeal._id} centerContent >
                <Td>{appeal.appealer}</Td>
                <Td>{appeal.name}</Td>
                <Td>{appeal.description}</Td>
                <Td>{appeal.status}</Td>
           

              <HStack>
              //*<Button my={10} colorScheme="red" onClick={()=>onDelete(espacio._id)}>Eliminar</Button>
              <Button my={10}  colorScheme="yellow" onClick={()=>router.push(`../api/appeal/admin/update/${appeal._id}`)} >Editar</Button>
              </HStack>
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
