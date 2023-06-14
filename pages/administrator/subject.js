import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import verifyAdmin from "../../utils/verifyAdmin";
import { useEffect, useState } from "react";
import axios from "axios";
import {Box} from "@chakra-ui/react";

import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'

export default function Home() {
    /*
    if (!verifyAdmin()) {
        return null
    }
 */
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSubject();
    }, [
        !loading
    ]);

    const getSubject = async () => {
        const response = await axios.get(`/api/subject/getAll`).then((res) => {
            setSubjects(res.data.data);
            setLoading(false);
        })
    };

    const deleteSubject = async (id) => {
        const response = await axios.delete(`/api/subject/delete/${id}`).then((res) => {
            getSubject();
        })
    };

    const editSubject = async (id) => {
        const response = await axios.put(`/api/subject/update/${id}`).then((res) => {
            getSubject();
        })
    };

    return (
        <>
            <Head>
                <title>Prueba</title>
            </Head>
            <Layout>
              <Box>
              {loading ? <p>Cargando...</p> :
                    <>
                        <Table variant="simple" border={{ color: { sm: "red", lg: "green" } }}>
                            <TableCaption> Subject management</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>Name</Th>
                                    <Th>Description</Th>
                                    <Th>date</Th>
                                    <Th>career</Th>
                                    <Th>Eliminar</Th>
                                    <Th>Editar</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {subjects.map((subject) => (
                                    <Tr key={subject._id}>
                                        <Td>{subject.subjectName}</Td>
                                        <Td>{subject.description}</Td>
                                        <Td>{subject.date}</Td>
                                        <Td>{subject.career}</Td>
                                        <Td><button onClick={() => deleteSubject(subject._id)}>Eliminar</button></Td>
                                        <Td><button>Editar</button></Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>

                    </>
                }
              </Box>
            </Layout>
        </>
    )
}
