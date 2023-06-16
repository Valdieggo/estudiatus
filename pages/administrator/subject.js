import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import verifyAdmin from "../../utils/verifyAdmin";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Box, Link } from "@chakra-ui/react";
import Swal from "sweetalert2";

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
    Image,
    Select,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    Button,
} from '@chakra-ui/react'

import { useDisclosure } from '@chakra-ui/react'


export default function Home() {
    verifyAdmin();

    //cambio formato fecha
    const moment = require('moment');

    // ajustes iniciales
    const [subjects, setSubjects] = useState([]);
    const [careers, setCareers] = useState([]);

    // para editar
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [career, setCareer] = useState("");
    const [search, setSearch] = useState("");

    // modal
    const [loading, setLoading] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {
        isOpen: isOpenCreate,
        onOpen: onOpenCreate,
        onClose: onCloseCreate
    } = useDisclosure()
    const initialRef = useRef(null)

    // *****************************************************
    useEffect(() => {
        getSubject();
    }, [
        !loading
    ]);

    // *****************************************************
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
    const handleCareerChange = (e) => {

        setCareer(e.target.value);
        console.log(career);
    }

    const handleOpenEdit = (key, name, description) => {
        setId(key);
        setName(name);
        setDescription(description);
        onOpen();
    }

    const handleUpdate = async () => {
        const response = await axios.put(`/api/subject/update`, {
            id: id,
            subjectName: name,
            description: description
        }).then((res) => {
            getSubject();
            Swal.fire({
                title: "Success",
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

    const handleCreate = async () => {
        const response = await axios.post(`/api/subject/create`, {
            subjectName: name,
            description: description,
            career: career
        }).then((res) => {
            getSubject();
            Swal.fire({
                title: "Success",
                icon: "success",
            });
        }).catch((err) => {
            Swal.fire({
                title: "Error",
                html: err.response.data.message,
                icon: "error",
            });
        })
        onCloseCreate();
    }

    const showSubjects = () => {
        let sub = [];
        if (search.length > 0) {
            sub = subjects.filter((subject) => {
                return subject.subjectName.toLowerCase().includes(search.toLowerCase());
            })
        } else {
            sub = subjects;
        }
        return (
            <>
                {sub.map((subject) => (
                    <Tr key={subject._id} color="white">
                        <Td><Link href={`/subject/${subject._id}`}>{subject.subjectName}</Link></Td>
                        <Td>{subject.description}</Td>
                        <Td>{moment(subject.date).format('DD/MM/YYYY')}</Td>
                        <Td><Link href={`/career/${subject.career}`}>{subject.careerName}</Link></Td>
                        <Td><button onClick={() => deleteSubject(subject._id)}>Delete</button></Td>
                        <Td>
                            <Button onClick={() => {
                                handleOpenEdit(subject._id, subject.subjectName, subject.description);
                            }}>
                                <Image src={`/edit.svg`} alt={`Edit`} width="20px" height="20px" />
                            </Button>
                            {showModalEdit()}
                        </Td>
                    </Tr>
                ))}
            </>
        )
    }
    const showModalEdit = () => {
        return (
            <>
                <Modal
                    initialFocusRef={initialRef}
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Edit subject</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input ref={initialRef} placeholder="Name" onChange={handleNameChange} />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Description</FormLabel>
                                <Input placeholder="Description" onChange={handleDescriptionChange} />
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
            </>
        )
    }

    const showModalCreate = () => {
        return (
            <>
                <Modal
                    initialFocusRef={initialRef}
                    isOpen={isOpenCreate}
                    onClose={onCloseCreate}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Create subject</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input ref={initialRef} placeholder="Name" onChange={handleNameChange} />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Description</FormLabel>
                                <Input placeholder="Description" onChange={handleDescriptionChange} />
                            </FormControl>

                            <FormControl onChange={handleCareerChange}>
                                <FormLabel>Career</FormLabel>
                                <Select placeholder="Select a career" >
                                    {careers.map((career) => (
                                        <option key={career._id} value={career._id} >{career.careerName}</option>
                                    ))}
                                </Select>
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3}
                                onClick={() => {
                                    handleCreate();
                                }}>
                                Create
                            </Button>
                            <Button onClick={onCloseCreate}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        )
    }

    const handleSearch = (e) => {
        setSearch(e.target.value.toLowerCase());
    }

    const searchBar = () => {
        return (
            <Box>
                <FormControl id="search">
                    <Input type="text" onChange={handleSearch} placeholder="Search by name" />
                </FormControl>
            </Box>
        )
    }

    return (
        <>
            <Head>
                <title>Subject management</title>
            </Head>
            <Layout>
                <Box width="99%">
                    {loading ? "Loading" :
                        <>
                            <Box>
                                Subject management system
                            </Box>
                            <Box>
                                <Button onClick={() => onOpenCreate()} colorScheme="blue" size="sm">
                                    <p>Create new subject</p>
                                    <Image src={`/document-plus.svg`} alt={`Edit`} width="20px" height="20px" />
                                </Button>
                                {showModalCreate()}
                            </Box>
                            <Box>
                            {searchBar()}
                                <Table variant="simple" border={{ color: { sm: "red", lg: "green" } }}>
                                    <TableCaption> Subject management</TableCaption>
                                    <Thead>
                                        <Tr>
                                            <Th width="20%">Name</Th>
                                            <Th width="20%">Description</Th>
                                            <Th width="20%">Creation date</Th>
                                            <Th width="20%">career</Th>
                                            <Th width="5%">Delete</Th>
                                            <Th width="5%">Edit</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {showSubjects()}
                                    </Tbody>
                                </Table>
                            </Box>
                        </>
                    }
                </Box>
            </Layout >
        </>
    )
}
