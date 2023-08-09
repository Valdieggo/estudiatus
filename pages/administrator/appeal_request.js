import React, {useState, useEffect}from 'react'
import Layout from "../../components/Layout/Layout";
import Head from 'next/head';
import verifyAdmin from "../../utils/verifyAdmin";
import { useDisclosure, useToast } from '@chakra-ui/react'
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  Button,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ButtonGroup
} from "@chakra-ui/react";
import axios from 'axios';
import { useRouter } from 'next/router';

export default function appeal_request() {
  verifyAdmin();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isOpenUpdate,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate
} = useDisclosure()
  const router=useRouter();
  const [appeal,setAppeals]= useState([])
  const getAppeal = async () => {
      try {
        const response = await axios.get("../api/appeal/getAll");
        setAppeals(response.data);
      } catch (error) {
        console.log(error);
      }
  };

  useEffect(()=>{
    getAppeal();
  }, [])

// Caso DELETE
const onDelete= async(apid)=>{
  const messageSuccess = "Apelacion eliminada con exito";
  const messageError = "Error el intenta eliminar la apelacion";
  const response = await axios.delete(`/api/appeal/delete/${apid}`)
    if(response.status == 204){
      showSuccessToast(messageSuccess);
     getAppeal();
      onClose();
    }else{
      showErrorToast(messageError);
      console.log('watefok')
      onClose();
      
    }
  }

const handleDelete=(apid)=>{
  return(
    <>
      <Modal 
      size='sm'
      isCentered 
      isOpen={isOpen} 
      onClose={onClose} 
      colorScheme='red'
      motionPreset='slideInBottom'
      >
        
        <ModalContent>
          <ModalHeader>Advertencia!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Seguro que desea eliminar esta apelación? Esta acción es irreversible</Text>
          </ModalBody>
          <ModalFooter>
            <HStack>
              <Button colorScheme='red' onClick={()=>onDelete(apid)}>Eliminar</Button>
            <Button onClick={onClose}>Cancelar</Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>

  )
}



//Toast MESSAGES
const toast = useToast();
const showSuccessToast = (message) => {
  toast({
      position: 'bottom-right',
      title: "Success.",
      description: message,
      status: "success",
      duration: 1500,
      isClosable: true,
  })
}
const showErrorToast = (message) => {
  toast({
      position: 'bottom-right',
      title: "Error.",
      description: message,
      status: "error",
      duration: 1500,
      isClosable: true,
  })
}

//Caso UPDATE
const onUpdate = async (estado, id) => {
  const messageSuccess = "Estado actualizado con éxito";
  const messageError = "Error al intentar actualizar el estado";
  const response = await axios.put(`/api/appeal/update/${id}`, {status:estado} )
  if(response.status==200){
    showSuccessToast(messageSuccess);
    getAppeal();
    onCloseUpdate();
  }else{
    showErrorToast(messageError);
    onCloseUpdate();
  }
}

  const handleUpdate = (id) => {
    return (
        <>
            <Modal
            isCentered
                isOpen={isOpenUpdate}
                onClose={onCloseUpdate}
                motionPreset='slideInBottom'
                size='xl'
                >
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Cambiar status</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                    <ButtonGroup variant='outline' spacing='6'>
                      <Button colorScheme='red'
                      onClick={()=>onUpdate('Rechazada', id)}
                      >Rechazada</Button>
                      <Button colorScheme='green'
                      onClick={()=>onUpdate('Aceptada',id)}
                      >Aceptada</Button>
                      <Button colorScheme='blue'
                      onClick={()=>onUpdate('En proceso',id)}
                      >En proceso</Button>
                      <Button onClick={onCloseUpdate}
                      >Cancelar</Button>
                    </ButtonGroup>
                        </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
//Fin caso UPDATE
  return (
    <>
      <Layout>
      <Container maxW='container.xl' mx="auto">
        <Table variant='simple'>
          <TableCaption placement='top'>Appeals requests</TableCaption>
          <Thead>
            <Tr>
              <Th>Appeal name</Th>
              <Th>Username</Th>
              <Th>Ban type</Th>
              <Th>Details</Th>
              <Th>Status</Th>
              <Th>Cambiar status</Th>
              <Th>Eliminar apelación</Th>
            </Tr>
          </Thead>
          <Tbody>
            {appeal.appeals?.map((appeal) => (
              <Tr key={appeal._id} >
                <Td>{appeal.name}</Td>
                <Td>{appeal.appealer.username}</Td>
                <Td>{appeal.ban.type}</Td>
                <Td maxWidth='200px'>{appeal.description}</Td>
                <Td>{appeal.status}</Td>
                <Td> 
                    <Button size='xs' onClick={onOpenUpdate}>
                    <Image src={`/edit.svg`} alt={`Edit`} width="20px" height="20px" />
                    </Button>
                    {handleUpdate(appeal._id)}
                  </Td>
              <Td><Button size='xs' onClick={onOpen}>Eliminar</Button> {handleDelete(appeal._id)} </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Container>
      </Layout>
    </>
  )

}
