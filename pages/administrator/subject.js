import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import Upload from "../../components/File/Upload";
import verifyAdmin from "../../utils/verifyAdmin";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

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
    useDisclosure,
    Box,
    Heading,
    Link,
    Text,
    useToast

} from '@chakra-ui/react'
import { set } from "date-fns";


export const getServerSideProps = async () => {
    const resSubject = await axios.get(`http://localhost:${process.env.PORT}/api/subject/getAll`);
    const resCareer = await axios.get(`http://localhost:${process.env.PORT}/api/career/getAll`);
    const subjects = resSubject.data.data;
    const careers = resCareer.data.data;
    return {
        props: {
            subjects,
            careers
        },
    };
}

export default function Home(data) {
    verifyAdmin();
    //mas adelante se puede exportar a otro archivo de idioma
    const texto = {
        "title": "Administración de asignaturas",
        "error": "Error",
        "success": "Éxito",
        "subtitle": "Lista de asignaturas",
        "create": "Crear asignatura",
        "name": "Nombre",
        "description": "Descripción",
        "career": "Carrera",
        "image": "Imagen",
        "actions": "Acciones",
        "edit": "Editar",
        "delete": "Eliminar",
        "search": "Buscar",
        "close": "Cerrar",
        "save": "Guardar",
        "cancel": "Cancelar",
        "update": "actualizar",
        "creationDate": "Fecha de creación",
        "findByName": "Buscar por nombre",
        "createSubject": "Crear asignatura",
        "editSubject": "Eliminar asignatura",
        "selectCareer": "Seleccionar carrera",
        "selectImage": "Seleccionar imagen",
        "select": "Seleccionar",
        "noData": "No se han encontrado datos",
        "noDataCareer": "No se han encontrado carreras",
        "noDataImage": "No se han encontrado imágenes",
        "noDataSubject": "No se han encontrado asignaturas",
        "noDataSearch": "No se han encontrado resultados",

        "messageSubjectCreateSuccess": "Asignatura creada correctamente",
        "messageSubjectCreateError": "Error al crear la asignatura",

        "messageSubjectUpdateSuccess": "Asignatura actualizada correctamente",
        "messageSubjectUpdateError": "Error al actualizar la asignatura",

        "messageSubjectDeleteSuccess": "Asignatura eliminada correctamente",
        "messageSubjectDeleteError": "Error al eliminar la asignatura",
    }
    //cambio formato fecha
    const moment = require('moment');
    const toast = useToast()

    // para editar
    const [subjects, setSubjects] = useState(data.subjects);
    const [careers, setCareers] = useState(data.careers);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [career, setCareer] = useState("");
    const [image, setImage] = useState("");
    const [filteredSubjects, setfilteredSubjects] = useState(subjects);
    const inputRef = useRef();
    // modal
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {
        isOpen: isOpenCreate,
        onOpen: onOpenCreate,
        onClose: onCloseCreate
    } = useDisclosure()
    const initialRef = useRef(null)



    // *****************************************************

    useEffect(() => {
        setfilteredSubjects(subjects);
    }, [subjects]);

    // *****************************************************





    //**** */
    //obtiene el nombre de todas las carreras con las id  que aparecieron en subjects y luego se las agrega a subject

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

    const handleOpenEdit = (key, name, description, idCareer) => {
        setId(key);
        setCareer(idCareer)
        setName(name);
        setDescription(description);
        onOpen();
    }

    const nullify = () => {
        console.log("nullify")
        setId("");
        setName("");
        setDescription("");
        setCareer("");
        setImage("");
    }

    const SuccessToast = (title, description) => {
        toast({
            title: title,
            description: description,
            status: "success",
            duration: 3000,
            isClosable: true,
            position: 'bottom-right'
        })
    }

    const ErrorToast = (title, description) => {
        toast({
            title: title,
            description: description,
            status: "error",
            duration: 3000,
            isClosable: true,
            position: 'bottom-right'
        })
    }

    const handleSearch = (e) => {
        const search = e.target.value.toLowerCase();
        if (search.length > 0) {
            setfilteredSubjects(subjects.filter((subject) => {
                return subject.subjectName.toLowerCase().match(search);
            }));
        } else {
            setfilteredSubjects(subjects);
        }
    }

    const deleteSubject = async (id) => {
        await axios.delete(`/api/subject/delete/${id}`).then((res) => {
            setSubjects(subjects.filter((subject) => {
                return subject._id !== id;
            }));
            SuccessToast(texto.success, texto.messageSubjectDeleteSuccess);
        }).catch((err) => {
            ErrorToast(texto.error, texto.messageSubjectDeleteError);
        })
        nullify();
    };

    const handleUpdate = async () => {
        const idImage = await Upload(image);

        await axios.put(`/api/subject/update`, {
            id: id,
            subjectName: name,
            description: description,
            img: idImage,
            career: career

        }).then((res) => {
            setSubjects(subjects.map((subject) => {
                if (subject._id === id) {
                    return {
                        ...subject,
                        subjectName: name,
                        description: description,
                        img: idImage,
                    }
                }
                return subject;
            }));
            SuccessToast(texto.messageSubjectUpdateSuccess);
        }).catch((err) => {
            ErrorToast(texto.messageSubjectUpdateError);
            //html: err.response.data.message,
        })
        nullify();
        onClose();
    }

    const handleCreate = async () => {
        const idImage = await Upload(image);
        const response = await axios.post(`/api/subject/create`, {
            subjectName: name,
            career: career,
            description: description,
            img: idImage
        }).then((res) => {
            subjects.push(res.data.data);
            SuccessToast(texto.success, texto.messageSubjectCreateSuccess);
        }).catch((err) => {
            ErrorToast(texto.error, texto.messageSubjectCreateError);
        })
        nullify();
        onCloseCreate();
    }


    const showModalEdit = () => {
        return (
            <>
                <Modal
                    initialFocusRef={initialRef}
                    isOpen={isOpen}
                    onClose={() => {
                        onClose();
                        SuccessToast("a", 2);
                    }}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>{texto.editSubject}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>{texto.name}</FormLabel>
                                <Input ref={initialRef} placeholder={texto.name} onChange={handleNameChange} />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>{texto.description}</FormLabel>
                                <Input placeholder={texto.description} onChange={handleDescriptionChange} />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>{texto.career}</FormLabel>
                                <Select placeholder={texto.selectCareer} onChange={handleCareerChange}>
                                    {careers.map((careerA) => {
                                        console.log(careerA)
                                        return (
                                            <option key={careerA._id} value={careerA._id}>{careerA.careerName}</option>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel>{texto.image}</FormLabel>
                                <Input placeholder={texto.image} type="file" onChange={handleImageChange} accept="image/*" />
                            </FormControl>
                            

                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3}
                                onClick={() => {
                                    handleUpdate();
                                }}>
                                {texto.update}
                            </Button>
                            <Button onClick={onClose}>{texto.cancel}</Button>
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
                        <ModalHeader>{texto.createSubject}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>{texto.name}</FormLabel>
                                <Input ref={initialRef} placeholder={texto.name} onChange={handleNameChange} />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>{texto.description}</FormLabel>
                                <Input placeholder={texto.description} onChange={handleDescriptionChange} />
                            </FormControl>

                            <FormControl>
                                <FormLabel>{texto.career}</FormLabel>
                                <Select placeholder={texto.selectCareer} onChange={handleCareerChange}>
                                    {careers.map((career) => (
                                        <option key={career._id} value={career._id} >{career.careerName}</option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel>{texto.image}</FormLabel>
                                <Input placeholder={texto.image} type="file" onChange={handleImageChange} accept="image/*" />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3}
                                onClick={() => {
                                    handleCreate();
                                }}>
                                {texto.create}
                            </Button>
                            <Button onClick={onCloseCreate}>{texto.cancel}</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        )
    }



    return (
        <>
            <Head>
                <title>{texto.title}</title>
            </Head>
            <Layout>

                <Heading textAlign={"center"} my={10}>{texto.subtitle}</Heading>

                <Box>

                    <Button onClick={() => onOpenCreate()} colorScheme="blue" size="sm">
                        <Text>{texto.createSubject}</Text>
                        <Image src={`/document-plus.svg`} alt={`Edit`} width="20px" height="20px" />
                    </Button>
                    {showModalCreate()}
                </Box>
                <Box>
                    <FormControl id="Buscar">
                        <Input type="text" onChange={handleSearch} placeholder={texto.findByName} />
                    </FormControl>
                    <Table variant="simple" border={{ color: { sm: "red", lg: "green" } }}>
                        <TableCaption>{texto.subtitle}</TableCaption>
                        <Thead>
                            <Tr>
                                <Th width="20%">{texto.name}</Th>
                                <Th width="20%">{texto.description}</Th>
                                <Th width="20%">{texto.creationDate}</Th>
                                <Th width="20%">{texto.career}</Th>
                                <Th width="5%">{texto.delete}</Th>
                                <Th width="5%">{texto.edit}</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {filteredSubjects.map((subject) => (
                                <Tr key={subject._id} color="white">
                                    <Td><Link href={`/subject/${subject._id}`}>{subject.subjectName}</Link></Td>
                                    <Td>{subject.description}</Td>
                                    <Td>{moment(subject.date).format('DD/MM/YYYY')}</Td>
                                    <Td><Link href={`/career/${subject.career._id}`}>{subject.career.careerName}</Link></Td>
                                    <Td><button onClick={() => deleteSubject(subject._id)}>{texto.delete}</button></Td>
                                    <Td>
                                        <Button onClick={() => {
                                            handleOpenEdit(subject._id, subject.subjectName, subject.description, subject.career._id);
                                        }}>
                                            <Image src={`/edit.svg`} alt={`Edit`} width="20px" height="20px" />
                                        </Button>
                                        {showModalEdit()}
                                    </Td>
                                </Tr>
                            ))}

                        </Tbody>
                    </Table>
                </Box>
            </Layout >
        </>
    )
}
