import { Button ,Box} from "@chakra-ui/react";

const PaginationControls = ({ currentPage, totalPages, handlePageChange }) => {
    return (
        <Box align="center">
            {Array.from({ length: totalPages }, (_, index) => (
                <Button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    colorScheme={currentPage === index + 1 ? 'cyan' : 'blue'}
                    variant={currentPage === index + 1 ? 'solid' : 'outline'}
                    mx={1} // Add margin for spacing
                >
                    {index + 1}
                </Button>
            ))}
        </Box>
    );
};

export default PaginationControls ;
