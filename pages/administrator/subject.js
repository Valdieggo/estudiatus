import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import verifyAdmin from "../../utils/verifyAdmin";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Box, Link } from "@chakra-ui/react";
import Upload from "../../components/File/Upload";

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

import { useToast } from '@chakra-ui/react'

import { useDisclosure } from '@chakra-ui/react'


export default function Home() {
    verifyAdmin();

    //cambio formato fecha
    const moment = require('moment');
    const toast = useToast();
    const toastIdRef = useRef();

    // ajustes iniciales
    const [subjects, setSubjects] = useState([]);
    const [careers, setCareers] = useState([]);

    // para editar
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [career, setCareer] = useState("");
    const [search, setSearch] = useState("");

    const [image, setImage] = useState("");

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
        const messageSuccess = "Subject deleted successfully";
        const messageError = "Error deleting the subject";

        const response = await axios.delete(`/api/subject/delete/${id}`).then((res) => {
            showSuccessToast(messageSuccess);
        }).catch((err) => {
            showErrorToast(messageError);
        })
        getSubject();
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

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }
    const handleCareerChange = (e) => {
        setCareer(e.target.value);
    }

    const handleOpenEdit = (key, name, description) => {
        setId(key);
        setName(name);
        setDescription(description);
        onOpen();
    }


    const showLoadingToast = () => {
        // si no esta activo el toast lo activa
        if (!toast.isActive(toastIdRef.current)) {
            toastIdRef.current = toast({
                position: 'bottom-right',
                title: "Loading...",
                status: "info",
                duration: 2000,
                isClosable: true,
            })
        }

    }
    //constante para el toast
    const showSuccessToast = (message) => {
        toast({
            position: 'bottom-right',
            title: "Success.",
            description: message,
            status: "success",
            duration: 2000,
            isClosable: true,
        })
    }

    const showErrorToast = (message) => {
        toast({
            position: 'bottom-right',
            title: "Error.",
            description: message,
            status: "error",
            duration: 2000,
            isClosable: true,
        })
    }

    
    const handleUpdate = async () => {
        const messageSuccess = "Subject updated successfully";
        const messageError = "Error updating the subject";
        console.log(id, name, description, career);
        const idImage = await Upload(image);

        const response = await axios.put(`/api/subject/update`, {
            id: id,
            subjectName: name,
            description: description,
            img: idImage,

        }).then((res) => {
            showSuccessToast(messageSuccess);
        }).catch((err) => {
            console.log(err)
            showErrorToast(messageError);
            //html: err.response.data.message,
        })
        getSubject();
        onClose();
    }

    const handleCreate = async () => {
        const messageSuccess = "Subject created successfully";
        const messageError = "Error creating subject";

        const idImage = await Upload(image);
        const response = await axios.post(`/api/subject/create`, {
            subjectName: name,
            career: career,
            description: description,
            img: idImage
        }).then((res) => {
            showSuccessToast(messageSuccess);
        }).catch((err) => {
            console.log(err)
            showErrorToast(messageError);
        })
        getSubject();
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
                            <FormControl>
                                <FormLabel>Imagen</FormLabel>
                                <Input placeholder="Image" type="file" onChange={handleImageChange} accept="image/*" />
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
                        <ModalHeader>Crear asignatura</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>Nombre</FormLabel>
                                <Input ref={initialRef} placeholder="Name" onChange={handleNameChange} />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Descripción</FormLabel>
                                <Input placeholder="Description" onChange={handleDescriptionChange} />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Carrera</FormLabel>
                                <Select placeholder="Select a career" onChange={handleCareerChange}>
                                    {careers.map((career) => (
                                        <option key={career._id} value={career._id} >{career.careerName}</option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Imagen</FormLabel>
                                <Input placeholder="Image" type="file" onChange={handleImageChange} accept="image/*" />
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
                    {loading ?
                        showLoadingToast()
                        :
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
