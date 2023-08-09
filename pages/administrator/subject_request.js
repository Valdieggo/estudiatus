import Head from "next/head";
import verifyAdmin from "../../utils/verifyAdmin";
import Layout from "../../components/Layout/Layout";
import {
    Button,
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from "@chakra-ui/react";
import axios from "axios";
import ModalSubjectRequest from "../../components/Admin/ModalSubjectRequest";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

export const getServerSideProps = async () => {
    const response = await axios.get(
        `http://localhost:3000/api/subject_request/getAll`
    );
    const subjectrequest = response.data.data;
    return {
        props: {
            subjectrequest,
        },
    };
};

const SubjectRequest = (data) => {
    verifyAdmin();
    const { subjectrequest } = data;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [subjectRequestId, setSubjectRequestId] = useState({});

    const handleOpenRequest = (id) => {
        setSubjectRequestId(id);
        onOpen();
    };

    const displaySubjectRequest = () => {
        return subjectrequest.map((request) => (
            <Tr key={request._id}>
                <Td>{request.subjectName}</Td>
                <Td>{request.collegeName}</Td>
                <Td>{request.careerName}</Td>
                <Td>{request.status}</Td>
                <Td>
                    <Button
                        colorScheme="pink"
                        variant="solid"
                        onClick={() => handleOpenRequest(request._id)}
                    >
                        Ver
                    </Button>
                </Td>
            </Tr>
        ));
    };

    return (
        <>
            <ModalSubjectRequest
                isOpen={isOpen}
                onClose={onClose}
                subjectRequestId={subjectRequestId}
            />
            <Head>
                <title>Solicitudes de asignaturas</title>
            </Head>
            <Layout>
                <Box pb={"10"}>Visualizacion de solicitudes de asignaturas</Box>
                <Box pr={"5%"}>
                    <TableContainer>
                        <Table variant="simple" size={"sm"}>
                            <Thead>
                                <Tr>
                                    <Th>Nombre asignatura</Th>
                                    <Th>Universidad</Th>
                                    <Th>Carrera</Th>
                                    <Th>Estado</Th>
                                    <Th>Opciones</Th>
                                </Tr>
                            </Thead>
                            <Tbody>{displaySubjectRequest()}</Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            </Layout>
        </>
    );
};

export default SubjectRequest;
