import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useToast } from '@chakra-ui/react'
import Layout from "../../components/Layout/Layout";
import { Box, Heading, Text, Button, HStack, VStack, Input, Textarea, Container } from "@chakra-ui/react";
import { FormControl, FormLabel, FormErrorMessage, FormHelperText } from "@chakra-ui/react"


export async function getServerSideProps(context) {
    const { id } = context.query
    const response = await axios.get(`http://localhost:3000/api/ban/getOne/${id}`)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            console.log(error)
        })
    const ban = response.ban
    return {
        props: {
            ban,
        },
    }
}


export default function appealForm({ban}){

    const [appeal, setAppeal] = useState({
        name:'',
        description:'',
        ban: ban._id,
        appealer: ban.user._id
    });

        const onChange=async(e)=>{
        setAppeal({
            ...appeal,
            [e.target.name]:e.target.value
        })
    }
    const router=useRouter()
//toast
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
//send handler
    const onSend = async (e)=>{  
        e.preventDefault()
        const messageSuccess = "Apelacion enviada correctamente, pronto recibirá una respuesta";
        const messageError = "Error al enviar la apelacion, intente nuevamente";
        console.log(appeal)
        try{
        const response= await axios.post(`${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_PORT}/api/appeal/create`, appeal)
        console.log(appeal)
            if(response.status==201){
                showSuccessToast(messageSuccess);
                router.push('/');
            }else{
                showErrorToast(messageError);
            }
        }catch(error){
            console.log(error)
            console.log('error 1')
        }
}

return(
    <Layout>
    <Container maxW="container.md">
    <Heading textAlign={"center"} my={10}>Formulario de apelación</Heading>
    <Box padding='20px'>
        <Text padding= '3px' >Su baneo esta fijado {ban.type}</Text>
        <Text padding= '3px' >A continuacion llene el formulario para hacer su apelacion</Text>
    </Box>
    <FormControl isRequired>
    <FormLabel>Razon de su apelacion</FormLabel>
    <Input placeholder='Porqué desea apelar?' type={"text"} onChange={onChange} name="name"/>
    </FormControl>

    <FormControl isRequired>
    <FormLabel>Detalles</FormLabel>
    <Input placeholder='Proporcione todos los detalles que considere necesarios para su apelación'type={"text"} 
    onChange={onChange} name="description" />
    </FormControl>
    <HStack padding='10px' >
            <Button colorScheme='red' onClick={onSend}>Enviar</Button>
        <Button onClick={()=>{router.push('/')}}>Cancelar</Button>
        </HStack>
    </Container>
    </Layout>
)


}