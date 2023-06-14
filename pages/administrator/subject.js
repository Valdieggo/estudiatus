import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import verifyAdmin from "../../utils/verifyAdmin";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Box, Link } from "@chakra-ui/react";
import Swal from "sweetalert2";


import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    Button,
} from '@chakra-ui/react'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Image
} from '@chakra-ui/react'

import { useDisclosure } from '@chakra-ui/react'


export default function Home() {
    /*
    if (!verifyAdmin()) {
        return null
    }
 */

    const moment = require('moment');
    const [id, setId] = useState("");

    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [careers, setCareers] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null)

    const handleOpen = (key, title) => {
        setId(key);
        setTitle(title);
        onOpen();
    }

    useEffect(() => {
        getSubject();
    }, [
        !loading
    ]);

    const getSubject = async () => {
        const response = await axios.get(`/api/subject/getAll`).then((res) => {
            setSubjects(res.data.data);
            getCareers(res.data.data);
        })
    };

    const deleteSubject = async (id) => {
        const response = await axios.delete(`/api/subject/delete/${id}`).then((res) => {
            getSubject();
        })
    };

    //obtiene el nombre de todas las carreras con las id  que aparecieron en subjects y luego se las agrega a subject
    const getCareers = async (subjects) => {
        const response = await axios.get(`/api/career/getAll`).then((res) => {
            setCareers(res.data.data);
            for (let i = 0; i < subjects.length; i++) {
                for (let j = 0; j < careers.length; j++) {
                    if (subjects[i].career == careers[j]._id) {
                        subjects[i].careerName = careers[j].careerName;
                    }
                }
            }
            setLoading(false);
        })

    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }


    const handleUpdate = async () => {
        const response = await axios.put(`/api/subject/update`, {
            id: id,
            subjectName: name,
            description: description
        }).then((res) => {
            getSubject();
            Swal.fire({
                title: "Sucess",
                icon: "success",
            });
        }).catch((err) => {
            Swal.fire({
                title: "Error",
                html: err.response.data.message,
                icon: "error",
            });
        })

        onClose();
    }

    return (
        <>
            <Head>
                <title>Prueba</title>
            </Head>
            <Layout>
                <Box>
                    {loading ? "Loading" :
                        <>
                            <Box>
                                Subject management system
                            </Box>

                            <Table variant="simple" border={{ color: { sm: "red", lg: "green" } }}>
                                <TableCaption> Subject management</TableCaption>
                                <Thead>
                                    <Tr>
                                        <Th>Name</Th>
                                        <Th>Description</Th>
                                        <Th>Creation date</Th>
                                        <Th>career</Th>
                                        <Th>Eliminar</Th>
                                        <Th>Editar</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {subjects.map((subject) => (
                                        <Tr key={subject._id} id="keyprueba" color="white">
                                            <Td><Link href={`/subject/${subject._id}`}>{subject.subjectName}</Link></Td>
                                            <Td>{subject.description}</Td>
                                            <Td>{moment(subject.date).format('DD/MM/YYYY')}</Td>
                                            <Td><Link href={`/career/${subject.career}`}>{subject.careerName}</Link></Td>
                                            <Td><button onClick={() => deleteSubject(subject._id)}>Eliminar</button></Td>
                                            <Td>
                                                <Button onClick={() => {
                                                    console.log(subject._id, subject.subjectName);
                                                    handleOpen(subject._id, subject.subjectName);
                                                }}>
                                                    <Image src={`/edit.svg`} alt={`Edit`} width="20px" height="20px" />

                                                </Button>
                                                <Modal
                                                    initialFocusRef={initialRef}
                                                    isOpen={isOpen}
                                                    onClose={onClose}
                                                >
                                                    <ModalOverlay />
                                                    <ModalContent>
                                                        <ModalHeader>Edit {title}</ModalHeader>
                                                        <ModalCloseButton />
                                                        <ModalBody pb={6}>
                                                            <FormControl>
                                                                <FormLabel>Name</FormLabel>
                                                                <Input ref={initialRef} placeholder={subject._id} onChange={handleNameChange} />
                                                            </FormControl>

                                                            <FormControl mt={4}>
                                                                <FormLabel>Description</FormLabel>
                                                                <Input placeholder={subject.description} onChange={handleDescriptionChange} />
                                                            </FormControl>
                                                        </ModalBody>

                                                        <ModalFooter>
                                                            <Button colorScheme='blue' mr={3}
                                                                onClick={() => {
                                                                    handleUpdate();
                                                                }}>
                                                                Update
                                                            </Button>
                                                            <Button onClick={onClose}>Cancel</Button>
                                                        </ModalFooter>
                                                    </ModalContent>
                                                </Modal>
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </>
                    }
                </Box>
            </Layout >
        </>
    )
}
