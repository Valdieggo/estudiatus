import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import verifyAdmin from "../../utils/verifyAdmin";
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

/* export const getServerSideProps = async () => {
    const response = await axios
        .get("/api/subject_request/getAll")
        .then((res) => {
            const subjectrequest = res.data.data;
            return {
                props: {
                    subjectrequest,
                },
            };
        })
        .catch((err) => {
            return { props: { subjectrequest: [] } };
        });
    return response;
}; */

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

    const displaySubjectRequest = () => {
        return subjectrequest.map((request) => (
            <Tr>
                <Td>{request.subjectName}</Td>
                <Td></Td>
                <Td></Td>
                <Td>{request.status}</Td>
                <Td>
                    <Button colorScheme="pink" variant="solid">
                        Ver
                    </Button>
                </Td>
            </Tr>
        ));
    };

    return (
        <>
            <Head>
                <title>Prueba</title>
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
                            <Tbody>
                                {/* <Tr>
                                    <Td>inches</Td>
                                    <Td>millimetres (mm)</Td>
                                    <Td isNumeric>25.4</Td>
                                    <Td></Td>
                                    <Td>
                                        <Button
                                            colorScheme="pink"
                                            variant="solid"
                                            onClick={getSubjectRequest}
                                        >
                                            Ver
                                        </Button>
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td>feet</Td>
                                    <Td>centimetres (cm)</Td>
                                    <Td isNumeric>30.48</Td>
                                </Tr>
                                <Tr>
                                    <Td>yards</Td>
                                    <Td>metres (m)</Td>
                                    <Td isNumeric>0.91444</Td>
                                </Tr> */}
                                {displaySubjectRequest()}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            </Layout>
        </>
    );
};

export default SubjectRequest;
