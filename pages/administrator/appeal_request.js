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

const {
  isOpen: isOpenDetails,
  onOpen: onOpenDetails,
  onClose: onCloseDetails
} = useDisclosure()

  const router=useRouter();
  const [appeal,setAppeals]= useState([])
  const getAppeal = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_PORT}/api/appeal/getAll`);
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
  const response = await axios.delete(`${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_PORT}/api/appeal/delete/${apid}`)
    if(response.status == 200){
      showSuccessToast(messageSuccess);
     getAppeal();
      onClose();
    }else{
      showErrorToast(messageError);
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
        <ModalOverlay/>
        <ModalContent background="bg.100" color="white">
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
const onUpdate = async (estado, id, idban) => {
  const messageSuccess = "Estado actualizado con éxito"
  const messageError = "Error al intentar actualizar el estado"
  if(estado=='Aceptada'){
    await axios.put(`${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_PORT}/api/ban/update`, {
      id: idban,
      status:'inactive'
    })}
  const response = await axios.put(`${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_PORT}/api/appeal/update/${id}`, {status:estado} )
  if(response.status==200){
    showSuccessToast(messageSuccess);
    getAppeal();
    onCloseUpdate();
  }else{
    showErrorToast(messageError);
    onCloseUpdate();
  }
}

  const handleUpdate = (id,idban) => {
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
                <ModalContent background="bg.100" color="white">
                <ModalHeader>Cambiar status</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                      <Text color='red.500' fontSize='xl' as='b'>Cuidado, esta acción es irreversible. Debe estar seguro del cambio de estado</Text>
                        </ModalBody>
                        <ModalFooter>
                        <ButtonGroup variant='outline' spacing='6'>
                      <Button colorScheme='red'
                      onClick={()=>onUpdate('Rechazada', id, idban)}
                      >Rechazada</Button>
                      <Button colorScheme='green'
                      onClick={()=>onUpdate('Aceptada',id, idban)}
                      >Aceptada</Button>
                      <Button onClick={onCloseUpdate} colorScheme='white'
                      >Cancelar</Button>
                    </ButtonGroup>
                        </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
//Fin caso UPDATE


//Modal Ver Detalles
const onDetails=(text)=>{
  return(
    <>
    <Modal
    isCentered
    isOpen={isOpenDetails}
    onClose={onCloseDetails}
    motionPreset='slideInBottom'
    size='xl'
    >
      <ModalOverlay/>
      <ModalContent background="bg.100" color="white">
      <ModalHeader>Detalles</ModalHeader>
      <ModalCloseButton/>
      <ModalBody>
        <Text>{text}</Text>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onCloseDetails}>Cerrar</Button>
      </ModalFooter>
      </ModalContent>
    </Modal>
    </>
  )
}
//Fin modal ver detalles

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
              <Th>Ban status</Th>
              <Th>Ban type</Th>
              <Th>Details</Th>
              <Th>Status</Th>
              <Th>Ver detalles</Th>
              <Th>Cambiar status</Th>
              <Th>Eliminar apelación</Th>
            </Tr>
          </Thead>
          <Tbody>
            {appeal.appeals?.filter((appeal)=>(appeal.ban.status!='inactive')).filter((appeal)=> appeal.status!='Rechazada').map((appeal) => (
              <Tr key={appeal._id} >
                <Td>{appeal.name}</Td>
                <Td>{appeal.appealer.username}</Td>
                <Td>{appeal.ban.status}</Td>
                <Td>{appeal.ban.type}</Td>
                <Td maxWidth='5px'><Text noOfLines={1} >{appeal.description}</Text></Td>
                <Td>{appeal.status}</Td>
                <Td>
                  <Button size='xs' onClick={onOpenDetails}>
                  <Image src={`/eye.svg`} alt={`see more`} width="20px" height="20px" />
                  </Button>{onDetails(appeal.description)}
                </Td>
                <Td> 
                  <Button size='xs' onClick={onOpenUpdate}>
                  <Image src={`/edit.svg`} alt={`Edit`} width="20px" height="20px" />
                  </Button>{handleUpdate(appeal._id, appeal.ban._id)}
                </Td>
                <Td>
                  <Button size='xs' onClick={onOpen}>
                  <Image src={`/trash.svg`} alt={`delete`} width="20px" height="20px" />
                  </Button> {handleDelete(appeal._id)} 
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Container>
      </Layout>
    </>
  )

}
