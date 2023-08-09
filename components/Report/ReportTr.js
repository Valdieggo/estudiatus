import { Tr, Td, Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";	
import ModalReport from "./ModalReport";

export default function ReportTr({ report, reports, setReports }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    return (
        <Tr>
            <Td>{report.reportedUser.username}</Td>
            <Td>{report.reason}</Td>
            <Td>{report.description}</Td>
            <Td>
                <Button
                colorScheme="green"
                onClick={onOpen}
                size="sm"
                >
                Detalle
                </Button>
            </Td>
            <ModalReport isOpen={isOpen} onClose={onClose} onOpen={onOpen} reportId={report._id}  setReports={setReports} reports={reports} />
        </Tr>
    );
}
